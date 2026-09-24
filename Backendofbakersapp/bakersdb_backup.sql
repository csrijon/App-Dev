--
-- PostgreSQL database dump
--

\restrict KoKPvsk6UyrEk4VF91Jg468YscgtgbbRYEsgj6d8lXILq2UbCOzbGV3Yh3Bv8W6

-- Dumped from database version 17.10 (Ubuntu 17.10-0ubuntu0.25.10.1)
-- Dumped by pg_dump version 18.0 (Ubuntu 18.0-1.pgdg25.04+3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "fullName" character varying(100),
    phone character varying(15),
    address text,
    city character varying(100),
    state character varying(100),
    pincode character varying(10),
    "isDefault" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Address_id_seq" OWNER TO postgres;

--
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cart_id_seq" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: CustomOrder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomOrder" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "cakeType" text,
    flavor text,
    size text,
    message text,
    "preferredDeliveryDate" timestamp(3) without time zone,
    description text,
    "referenceImageUrl" text,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CustomOrder" OWNER TO postgres;

--
-- Name: CustomOrder_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CustomOrder_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CustomOrder_id_seq" OWNER TO postgres;

--
-- Name: CustomOrder_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CustomOrder_id_seq" OWNED BY public."CustomOrder".id;


--
-- Name: DeliveryBoy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DeliveryBoy" (
    id integer NOT NULL
);


ALTER TABLE public."DeliveryBoy" OWNER TO postgres;

--
-- Name: DeliveryBoy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DeliveryBoy_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DeliveryBoy_id_seq" OWNER TO postgres;

--
-- Name: DeliveryBoy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DeliveryBoy_id_seq" OWNED BY public."DeliveryBoy".id;


--
-- Name: DeliveryTracking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DeliveryTracking" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "deliveryBoyId" integer NOT NULL,
    latitude numeric(10,7),
    longitude numeric(10,7),
    status character varying(50),
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."DeliveryTracking" OWNER TO postgres;

--
-- Name: DeliveryTracking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DeliveryTracking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DeliveryTracking_id_seq" OWNER TO postgres;

--
-- Name: DeliveryTracking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DeliveryTracking_id_seq" OWNED BY public."DeliveryTracking".id;


--
-- Name: Discount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Discount" (
    "discountId" integer NOT NULL,
    "discountName" character varying(100),
    "discountPercent" numeric(5,2),
    "discountCode" character varying(50),
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Discount" OWNER TO postgres;

--
-- Name: Discount_discountId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Discount_discountId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Discount_discountId_seq" OWNER TO postgres;

--
-- Name: Discount_discountId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Discount_discountId_seq" OWNED BY public."Discount"."discountId";


--
-- Name: Login&signupsystem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Login&signupsystem" (
    id integer NOT NULL,
    "Name" text NOT NULL,
    "Email" text NOT NULL,
    "Mobile" text NOT NULL,
    "Password" text NOT NULL,
    "profileImageUrl" text,
    role text DEFAULT 'customer'::text
);


ALTER TABLE public."Login&signupsystem" OWNER TO postgres;

--
-- Name: Login&signupsystem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Login&signupsystem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Login&signupsystem_id_seq" OWNER TO postgres;

--
-- Name: Login&signupsystem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Login&signupsystem_id_seq" OWNED BY public."Login&signupsystem".id;


--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title character varying(255),
    message text,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_id_seq" OWNER TO postgres;

--
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- Name: Onboarding; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Onboarding" (
    id integer NOT NULL,
    "bakersName" character varying(150),
    "ownerName" character varying(150),
    email character varying(150),
    phone character varying(20),
    "businessType" character varying(50),
    "logoUrl" text,
    "shopAddress" text,
    landmark text,
    city character varying(50),
    pincode character varying(10),
    state character varying(50),
    "fssaiNumber" character varying(50),
    "fssaiImage" text,
    "openingTime" text,
    "closingTime" text,
    "weeklyOffDay" text,
    "acceptOrder247" boolean DEFAULT false NOT NULL,
    "deliveryAvailable" boolean DEFAULT false NOT NULL,
    "deliveryRadius" text,
    "deliveryCharge" text,
    "freeDeliveryAbove" text,
    "minimumOrderValue" text,
    "productNames" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Onboarding" OWNER TO postgres;

--
-- Name: Onboarding_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Onboarding_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Onboarding_id_seq" OWNER TO postgres;

--
-- Name: Onboarding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Onboarding_id_seq" OWNED BY public."Onboarding".id;


--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    "orderId" integer NOT NULL,
    "orderNumber" character varying(50),
    "customerName" character varying(150),
    "customerPhone" character varying(20),
    "customerAddress" text,
    "totalAmount" numeric(10,2),
    "paymentMethod" character varying(50),
    "paymentStatus" character varying(20),
    "orderStatus" character varying(20),
    "orderDate" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone,
    "userId" integer,
    "completedAt" timestamp(3) without time zone,
    "deliveryDate" timestamp(3) without time zone,
    "idempotencyKey" character varying(255),
    "storeProfileId" integer
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_orderId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_orderId_seq" OWNER TO postgres;

--
-- Name: Order_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_orderId_seq" OWNED BY public."Order"."orderId";


--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    amount numeric(10,2),
    "paymentMethod" character varying(50),
    "paymentStatus" character varying(30),
    "transactionId" character varying(255),
    "paidAt" timestamp(3) without time zone
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    "productId" integer NOT NULL,
    "productName" character varying(150),
    description character varying(220),
    "imageUrl" text,
    price numeric(10,2),
    weight numeric(10,2),
    "weightUnit" character varying(10),
    "stockQty" integer,
    "prepTimeMinutes" integer,
    "availableSizes" text,
    "isEggless" boolean DEFAULT false NOT NULL,
    "flavorProfile" character varying(100),
    category character varying(100),
    "publicCatalog" boolean DEFAULT false NOT NULL,
    bestseller boolean DEFAULT false NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    "allowCustomMessage" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone,
    "updatedAt" timestamp(3) without time zone,
    "storeProfileId" integer
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_productId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_productId_seq" OWNER TO postgres;

--
-- Name: Product_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_productId_seq" OWNED BY public."Product"."productId";


--
-- Name: Refund; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Refund" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "userId" integer NOT NULL,
    reason text,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    "adminReason" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Refund" OWNER TO postgres;

--
-- Name: Refund_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Refund_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Refund_id_seq" OWNER TO postgres;

--
-- Name: Refund_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Refund_id_seq" OWNED BY public."Refund".id;


--
-- Name: ResetToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ResetToken" (
    id integer NOT NULL,
    email text NOT NULL,
    token character varying(255) NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ResetToken" OWNER TO postgres;

--
-- Name: ResetToken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ResetToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ResetToken_id_seq" OWNER TO postgres;

--
-- Name: ResetToken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ResetToken_id_seq" OWNED BY public."ResetToken".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    rating integer,
    comment text,
    "createdAt" timestamp(3) without time zone
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: StoreProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StoreProfile" (
    id integer NOT NULL,
    "bakersName" character varying(150),
    "ownerName" character varying(150),
    email character varying(150),
    phone character varying(20),
    "businessType" character varying(50),
    "logoUrl" text,
    "shopAddress" text,
    landmark text,
    city character varying(50),
    pincode character varying(10),
    state character varying(50),
    "fssaiNumber" character varying(50),
    "fssaiImage" text,
    "openingTime" text,
    "closingTime" text,
    "weeklyOffDay" text,
    "acceptOrder247" boolean DEFAULT false NOT NULL,
    "deliveryAvailable" boolean DEFAULT false NOT NULL,
    "deliveryRadius" text,
    "deliveryCharge" text,
    "freeDeliveryAbove" text,
    "minimumOrderValue" text,
    "productNames" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    latitude double precision,
    longitude double precision
);


ALTER TABLE public."StoreProfile" OWNER TO postgres;

--
-- Name: StoreProfile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StoreProfile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StoreProfile_id_seq" OWNER TO postgres;

--
-- Name: StoreProfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StoreProfile_id_seq" OWNED BY public."StoreProfile".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address" ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: CustomOrder id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomOrder" ALTER COLUMN id SET DEFAULT nextval('public."CustomOrder_id_seq"'::regclass);


--
-- Name: DeliveryBoy id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryBoy" ALTER COLUMN id SET DEFAULT nextval('public."DeliveryBoy_id_seq"'::regclass);


--
-- Name: DeliveryTracking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryTracking" ALTER COLUMN id SET DEFAULT nextval('public."DeliveryTracking_id_seq"'::regclass);


--
-- Name: Discount discountId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount" ALTER COLUMN "discountId" SET DEFAULT nextval('public."Discount_discountId_seq"'::regclass);


--
-- Name: Login&signupsystem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Login&signupsystem" ALTER COLUMN id SET DEFAULT nextval('public."Login&signupsystem_id_seq"'::regclass);


--
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- Name: Onboarding id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Onboarding" ALTER COLUMN id SET DEFAULT nextval('public."Onboarding_id_seq"'::regclass);


--
-- Name: Order orderId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN "orderId" SET DEFAULT nextval('public."Order_orderId_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Product productId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN "productId" SET DEFAULT nextval('public."Product_productId_seq"'::regclass);


--
-- Name: Refund id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Refund" ALTER COLUMN id SET DEFAULT nextval('public."Refund_id_seq"'::regclass);


--
-- Name: ResetToken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ResetToken" ALTER COLUMN id SET DEFAULT nextval('public."ResetToken_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: StoreProfile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoreProfile" ALTER COLUMN id SET DEFAULT nextval('public."StoreProfile_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, "userId", "fullName", phone, address, city, state, pincode, "isDefault") FROM stdin;
1	1	Srijon Chowdhury	7894561230	14 Number Golak dutta lane l, Last apartment of our gali 	kolkata	West Bengal	700005	f
\.


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (id, "userId", "productId", quantity, "createdAt") FROM stdin;
\.


--
-- Data for Name: CustomOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomOrder" (id, "userId", "cakeType", flavor, size, message, "preferredDeliveryDate", description, "referenceImageUrl", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: DeliveryBoy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DeliveryBoy" (id) FROM stdin;
\.


--
-- Data for Name: DeliveryTracking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DeliveryTracking" (id, "orderId", "deliveryBoyId", latitude, longitude, status, "updatedAt") FROM stdin;
\.


--
-- Data for Name: Discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Discount" ("discountId", "discountName", "discountPercent", "discountCode", "startDate", "endDate", "isActive", "createdAt") FROM stdin;
\.


--
-- Data for Name: Login&signupsystem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Login&signupsystem" (id, "Name", "Email", "Mobile", "Password", "profileImageUrl", role) FROM stdin;
2	piku	csrijon123@gmail.com	1236547890	$2b$10$.05sol4zBfxHGzZtD44VyeMAmgnpJVNiA7i0SNWwsTSRJGpyfYY6O	\N	admin
1	fdsacsa	csrijon0000@gmail.com	7894561230	$2b$10$Xzgk5i85J3gUYDX4YVuo5uI9lTN46SIcgykbu9eTl/lrNsqHdgIIi	/1789727193200-profile.jpg	customer
3	Srijon chordhory	csrijon1234@gmail.com	1236547891	$2b$10$DIrNxxfONIcr2V5Pi0OvIO.kMtb1upiBhATICgkMCMPIH9U6yW4ry	\N	admin
4	Srijon Chowdhyrt 	csrijon23@gmail.com	4561237890	$2b$10$Og0zvV9K/MOZW/UtNB939e1PYuYkkuqo5kqcto924oOmPgA/pZdfm	\N	admin
5	Piku don	csrijon4567@gmail.com	7412589630	$2b$10$xvwiElvqLZAvkyvq2El6Nu/9OmUrU11vW5sKrPScVYIO/FKfSLhqu	\N	admin
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" (id, "userId", title, message, "isRead", "createdAt") FROM stdin;
3	1	Order Placed	Your order #BK-9657 has been placed successfully.	t	2026-09-18 08:52:55.193
2	1	Order Placed	Your order #BK-5255 has been placed successfully.	t	2026-09-18 08:26:29.721
1	1	Order Placed	Your order #BK-6203 has been placed successfully.	t	2026-09-18 08:21:14.073
4	1	Order Placed	Your order #BK-6630 has been placed successfully.	t	2026-09-18 10:01:18.624
5	1	Order Placed	Your order #BK-9469 has been placed successfully.	t	2026-09-18 10:05:53.63
6	1	Order Placed	Your order #BK-5389 has been placed successfully.	t	2026-09-18 10:12:36.852
\.


--
-- Data for Name: Onboarding; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Onboarding" (id, "bakersName", "ownerName", email, phone, "businessType", "logoUrl", "shopAddress", landmark, city, pincode, state, "fssaiNumber", "fssaiImage", "openingTime", "closingTime", "weeklyOffDay", "acceptOrder247", "deliveryAvailable", "deliveryRadius", "deliveryCharge", "freeDeliveryAbove", "minimumOrderValue", "productNames", "createdAt") FROM stdin;
1	dwd	asdas	csrijon92@gmail.com	7029046473	Bakery	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_7ad7de06-fa29-40e6-9906-7b5d34550dfa.jpg	dasX	dsCAcsd	csdcsdsdc	789456	Chhattisgarh	78945612301235	\N	08:00 AM	08:01 PM	Monday	f	f	5	\N	\N	20	["Anniversary Cakes"]	2026-09-17 18:24:01.488
2	saSA	ASSAas	csrijon92@gmail.com	7894561230	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_6d4d1019-2f47-4b29-8586-853a6c6f196e.jpg	Srkojsfdmms;damsamxkaxsa	dscasCD	kolkata	784512	Bihar	78945612301236	\N	08:00 AM	08:01 PM	Monday	f	f	5	\N	\N	20	["Wedding Cakes","Birthday Cakes","Cakes","Anniversary Cakes","Cookies","Bread","Pastries"]	2026-09-17 18:30:29.523
3	dssasd	fdsac	csrijon92@gmail.com	7894561230	Bakery	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_94cbc2a2-9f8c-44f1-92bc-3ff8889fbd7e.jpg	csxz	x	kolkata	789456	Bihar	78945612307894	\N	08:00 AM	08:01 PM	Monday	f	f	5	\N	\N	45	["Bread","Pastries","Muffins","Croissants"]	2026-09-17 18:55:28.483
4	sadd	dsadas	csrijon92@gmail.com	7894561230	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_2972dd97-7a95-4ea4-a1dd-1b0fbcaf6241.jpg	vdxvd	vxcxc	kolkata	789456	Chhattisgarh	78945612211111	\N	08:00 AM	08:01 PM	Monday	f	f	5	\N	\N	20	["Anniversary Cakes","Birthday Cakes","Cakes","Wedding Cakes","Pastries","Bread","Cookies"]	2026-09-17 19:02:48.209
5	srijo	cccccc	csrijon92@gmail.com	7894561230	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_da80d568-c3f7-4028-874e-15187332ef39.jpg	dscdcdc	dssda	kolkata	721212	Bihar	78945612307894	\N	08:00 AM	08:00 PM	Monday	f	f	55	\N	\N	89	["Bread","Croissants"]	2026-09-18 12:50:01.114
6	srijo	chowdhury	csrijon92@gmail.com	7212121212	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_e260e8aa-5031-4bfe-9ad4-1a240293e35f.jpg	rkflkkfd	huhhu	kolkata	721212	Assam	78945612307894	\N	08:00 AM	08:00 PM	Monday	f	f	5	\N	\N	20	["Cookies","Bread"]	2026-09-18 12:58:31.154
7	dsdcs	dcs	dcs34@gmail.com	7029046473	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_d49aa8f3-8a98-4c09-a94a-5d40cee1a7d3.jpg	sdax	csax	kolkata	721212	Bihar	78945612307895	\N	08:00 AM	08:00 PM	\N	f	f	5	\N	\N	20	["Birthday Cakes","Wedding Cakes","Anniversary Cakes"]	2026-09-18 13:07:12.876
8	dsa	sad	sda34@gmail.com	7894561230	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_b8f093eb-36ec-4818-9e84-eb53d4b0ee7c.jpg	csasca	casasc	kolkata	721212	Chhattisgarh	78945612301222	\N	08:00 AM	08:00 PM	\N	f	f	45	\N	\N	20	["Wedding Cakes","Cakes","Birthday Cakes","Anniversary Cakes"]	2026-09-18 13:10:26.384
9	hhh	ccc	iiii45@gmail.cm	7894562222	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_c1d6e337-ddd2-4ec6-8b5e-8186d4600e0d.webp	srijon	ggg	kolkata	789456	Bihar	78945612311111	\N	08:00 AM	08:00 PM	Monday	f	f	78	\N	\N	45	["Birthday Cakes","Anniversary Cakes"]	2026-09-18 13:22:26.892
10	srijon	Piku 	\N	7412589638	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_278010d6-af17-47ea-a99e-2866a6b412bd.jpg	Srijon chowdhury	Srijon	kolkata	721212	Lakshadweep	78945623322222	\N	08:00 AM	08:01 PM	Monday	f	f	56	\N	\N	85	["Birthday Cakes","Cakes","Wedding Cakes","Anniversary Cakes","Cookies"]	2026-09-19 10:01:07.979
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" ("orderId", "orderNumber", "customerName", "customerPhone", "customerAddress", "totalAmount", "paymentMethod", "paymentStatus", "orderStatus", "orderDate", "updatedAt", "userId", "completedAt", "deliveryDate", "idempotencyKey", "storeProfileId") FROM stdin;
1	BK-6203	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 08:21:13.977	\N	1	\N	2026-09-29 18:30:00	checkout-1789719673581-41576	\N
2	BK-5255	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 08:26:29.714	\N	1	\N	2026-09-22 18:30:00	checkout-1789719989336-94522	\N
3	BK-9657	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 08:52:55.187	\N	1	\N	2026-09-22 18:30:00	checkout-1789721574803-31797	\N
4	BK-6630	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 10:01:18.62	\N	1	\N	2026-09-29 18:30:00	checkout-1789725678203-74633	\N
5	BK-9469	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 10:05:53.624	\N	1	\N	2026-09-29 18:30:00	checkout-1789725953201-19354	\N
6	BK-5389	Customer	7894561230		0.00	razorpay	paid	pending	2026-09-18 10:12:36.845	\N	1	\N	2026-09-29 18:30:00	checkout-1789726356401-2726	\N
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price) FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, "orderId", amount, "paymentMethod", "paymentStatus", "transactionId", "paidAt") FROM stdin;
1	1	0.00	razorpay	paid	\N	2026-09-18 08:21:13.977
2	2	0.00	razorpay	paid	\N	2026-09-18 08:26:29.714
3	3	0.00	razorpay	paid	\N	2026-09-18 08:52:55.187
4	4	0.00	razorpay	paid	\N	2026-09-18 10:01:18.62
5	5	0.00	razorpay	paid	\N	2026-09-18 10:05:53.624
6	6	0.00	razorpay	paid	\N	2026-09-18 10:12:36.845
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" ("productId", "productName", description, "imageUrl", price, weight, "weightUnit", "stockQty", "prepTimeMinutes", "availableSizes", "isEggless", "flavorProfile", category, "publicCatalog", bestseller, featured, "allowCustomMessage", "createdAt", "updatedAt", "storeProfileId") FROM stdin;
1	fdfdsfsd	asdsadcc	/1789669855471-34.jpg	7894.00	\N	kg	0	\N		t	Valrhona Chocolate	Wedding	t	f	f	t	\N	\N	\N
2	rgefv	scdcds	/1789671353778-34.jpg	456.00	\N	kg	0	\N		t	Valrhona Chocolate	Wedding	t	f	f	t	\N	\N	\N
3	79946622	ygyuuuggggghhh	/1789671802191-34.jpg	789.00	\N	kg	0	\N		t	Valrhona Chocolate	Wedding	t	f	f	t	\N	\N	\N
4	Muffin	loremtyyhhhcsnjcdsjcd	/1789736456140-1000000033.jpg	5000.00	1.00	kg	0	\N		t	Valrhona Chocolate	Pastries	t	f	f	t	\N	\N	\N
\.


--
-- Data for Name: Refund; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Refund" (id, "orderId", "userId", reason, status, "adminReason", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ResetToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ResetToken" (id, email, token, "expiresAt", used, "createdAt") FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userId", "productId", rating, comment, "createdAt") FROM stdin;
\.


--
-- Data for Name: StoreProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StoreProfile" (id, "bakersName", "ownerName", email, phone, "businessType", "logoUrl", "shopAddress", landmark, city, pincode, state, "fssaiNumber", "fssaiImage", "openingTime", "closingTime", "weeklyOffDay", "acceptOrder247", "deliveryAvailable", "deliveryRadius", "deliveryCharge", "freeDeliveryAbove", "minimumOrderValue", "productNames", "createdAt", latitude, longitude) FROM stdin;
1	srijon	Piku 	\N	7412589638	\N	file:///data/user/0/com.cakedeliveryadmin/cache/rn_image_picker_lib_temp_278010d6-af17-47ea-a99e-2866a6b412bd.jpg	Srijon chowdhury	Srijon	kolkata	721212	Lakshadweep	78945623322222	\N	08:00 AM	08:01 PM	Monday	f	f	56	\N	\N	85	["Birthday Cakes","Cakes","Wedding Cakes","Anniversary Cakes","Cookies"]	2026-09-17 18:24:01.481	\N	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0294ba87-48df-4e21-9c0c-18ea1291a69f	6c813c43005cd92ee49243f51e1f7c403d04267624d3f3c26a6782ca111581e0	2026-09-16 20:39:58.533262+05:30	20260821104734_init	\N	\N	2026-09-16 20:39:58.501541+05:30	1
5b59a2c9-cc10-4b4e-9ce0-662aaf2e53fa	58acd578b12d8f0087bc9819ec9d020e40bfa91e194d6fe7a39867f4a4f59d5f	2026-09-16 20:39:58.539096+05:30	20260911000000_fix_relations	\N	\N	2026-09-16 20:39:58.533878+05:30	1
1709e930-9b29-4e2f-96ee-75b854d79dea	45e0f3ea1f75adf022c4ca9ff043bb15ab76b77e3e95284a5a3d4c384e66309d	2026-09-16 20:39:58.545044+05:30	20260912000000_add_refund	\N	\N	2026-09-16 20:39:58.539768+05:30	1
a0dbd816-11ed-4238-a63e-0d2ac1b04eef	4742ea800975c404a0fd51a9bc95daf2de9d9c0b32ec697901784b86c54c52fa	2026-09-16 20:40:50.594739+05:30	20260916151012_add_custom_order_and_profile_image	\N	\N	2026-09-16 20:40:50.567152+05:30	1
\.


--
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Address_id_seq"', 1, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 8, true);


--
-- Name: CustomOrder_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CustomOrder_id_seq"', 1, false);


--
-- Name: DeliveryBoy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DeliveryBoy_id_seq"', 1, false);


--
-- Name: DeliveryTracking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DeliveryTracking_id_seq"', 1, false);


--
-- Name: Discount_discountId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Discount_discountId_seq"', 1, false);


--
-- Name: Login&signupsystem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Login&signupsystem_id_seq"', 5, true);


--
-- Name: Notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notifications_id_seq"', 6, true);


--
-- Name: Onboarding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Onboarding_id_seq"', 10, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Order_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_orderId_seq"', 6, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 6, true);


--
-- Name: Product_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_productId_seq"', 4, true);


--
-- Name: Refund_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Refund_id_seq"', 1, false);


--
-- Name: ResetToken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ResetToken_id_seq"', 1, false);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: StoreProfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StoreProfile_id_seq"', 1, true);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: CustomOrder CustomOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomOrder"
    ADD CONSTRAINT "CustomOrder_pkey" PRIMARY KEY (id);


--
-- Name: DeliveryBoy DeliveryBoy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryBoy"
    ADD CONSTRAINT "DeliveryBoy_pkey" PRIMARY KEY (id);


--
-- Name: DeliveryTracking DeliveryTracking_orderId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryTracking"
    ADD CONSTRAINT "DeliveryTracking_orderId_key" UNIQUE ("orderId");


--
-- Name: DeliveryTracking DeliveryTracking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryTracking"
    ADD CONSTRAINT "DeliveryTracking_pkey" PRIMARY KEY (id);


--
-- Name: Discount Discount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Discount"
    ADD CONSTRAINT "Discount_pkey" PRIMARY KEY ("discountId");


--
-- Name: Login&signupsystem Login&signupsystem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Login&signupsystem"
    ADD CONSTRAINT "Login&signupsystem_pkey" PRIMARY KEY (id);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: Onboarding Onboarding_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Onboarding"
    ADD CONSTRAINT "Onboarding_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("productId");


--
-- Name: Refund Refund_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Refund"
    ADD CONSTRAINT "Refund_pkey" PRIMARY KEY (id);


--
-- Name: ResetToken ResetToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ResetToken"
    ADD CONSTRAINT "ResetToken_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: StoreProfile StoreProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StoreProfile"
    ADD CONSTRAINT "StoreProfile_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Address_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Address_userId_idx" ON public."Address" USING btree ("userId");


--
-- Name: Cart_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cart_productId_idx" ON public."Cart" USING btree ("productId");


--
-- Name: Cart_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Cart_userId_idx" ON public."Cart" USING btree ("userId");


--
-- Name: DeliveryTracking_deliveryBoyId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DeliveryTracking_deliveryBoyId_idx" ON public."DeliveryTracking" USING btree ("deliveryBoyId");


--
-- Name: DeliveryTracking_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DeliveryTracking_orderId_idx" ON public."DeliveryTracking" USING btree ("orderId");


--
-- Name: Login&signupsystem_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Login&signupsystem_Email_key" ON public."Login&signupsystem" USING btree ("Email");


--
-- Name: Login&signupsystem_Mobile_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Login&signupsystem_Mobile_key" ON public."Login&signupsystem" USING btree ("Mobile");


--
-- Name: Notifications_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Notifications_userId_idx" ON public."Notifications" USING btree ("userId");


--
-- Name: OrderItem_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_orderId_idx" ON public."OrderItem" USING btree ("orderId");


--
-- Name: OrderItem_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "OrderItem_productId_idx" ON public."OrderItem" USING btree ("productId");


--
-- Name: Payment_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Payment_orderId_idx" ON public."Payment" USING btree ("orderId");


--
-- Name: Refund_orderId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Refund_orderId_idx" ON public."Refund" USING btree ("orderId");


--
-- Name: Refund_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Refund_status_idx" ON public."Refund" USING btree (status);


--
-- Name: Refund_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Refund_userId_idx" ON public."Refund" USING btree ("userId");


--
-- Name: ResetToken_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ResetToken_email_key" ON public."ResetToken" USING btree (email);


--
-- Name: Review_productId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_productId_idx" ON public."Review" USING btree ("productId");


--
-- Name: Review_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Review_userId_idx" ON public."Review" USING btree ("userId");


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Cart Cart_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"("productId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Cart Cart_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CustomOrder CustomOrder_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomOrder"
    ADD CONSTRAINT "CustomOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DeliveryTracking DeliveryTracking_deliveryBoyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryTracking"
    ADD CONSTRAINT "DeliveryTracking_deliveryBoyId_fkey" FOREIGN KEY ("deliveryBoyId") REFERENCES public."DeliveryBoy"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DeliveryTracking DeliveryTracking_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DeliveryTracking"
    ADD CONSTRAINT "DeliveryTracking_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"("orderId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"("orderId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"("productId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_storeProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_storeProfileId_fkey" FOREIGN KEY ("storeProfileId") REFERENCES public."StoreProfile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payment Payment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"("orderId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Product Product_storeProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_storeProfileId_fkey" FOREIGN KEY ("storeProfileId") REFERENCES public."StoreProfile"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Refund Refund_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Refund"
    ADD CONSTRAINT "Refund_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"("orderId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Refund Refund_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Refund"
    ADD CONSTRAINT "Refund_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ResetToken ResetToken_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ResetToken"
    ADD CONSTRAINT "ResetToken_email_fkey" FOREIGN KEY (email) REFERENCES public."Login&signupsystem"("Email") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"("productId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Login&signupsystem"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict KoKPvsk6UyrEk4VF91Jg468YscgtgbbRYEsgj6d8lXILq2UbCOzbGV3Yh3Bv8W6

