import prisma from "../config/prisma.js";

// Haversine distance in km
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const nearbyArtists = async (req, res) => {
    try {
        const { latitude, longitude, radiusKm = 10 } = req.query;
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const radius = parseFloat(radiusKm) || 10;

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ success: false, message: "Invalid latitude/longitude" });
        }
        if (radius < 1 || radius > 50) {
            return res.status(400).json({ success: false, message: "Radius must be between 1 and 50 km" });
        }

        const all = await prisma.storeProfile.findMany({
            where: {
                latitude: { not: null },
                longitude: { not: null },
            },
        });

        const results = [];
        for (const s of all) {
            if (s.latitude == null || s.longitude == null) continue;
            const d = haversine(lat, lng, s.latitude, s.longitude);
            if (d <= radius) {
                results.push({ ...s, distanceKm: parseFloat(d.toFixed(2)) });
            }
        }

        results.sort((a, b) => a.distanceKm - b.distanceKm);

        // Do not expose customer lat/long in response
        res.json({ success: true, count: results.length, artists: results });
    } catch (e) {
        console.error("Nearby artists error:", e);
        res.status(500).json({ success: false, message: "Failed to fetch nearby artists" });
    }
};
