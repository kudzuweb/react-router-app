import { type RouteConfig, index, route } from "@react-router/routes";

export default [index("routes/home.tsx"),
route("api/auth/*", "routes/api.auth.ts")
] satisfies RouteConfig;
