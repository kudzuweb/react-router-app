import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [route("protected", 'routes/protected.tsx'),
index("routes/home.tsx"),
route("api/auth/*", "routes/api.auth.$.ts"),
route("welcome", "routes/welcome.tsx"),
route("chat", "routes/chat.tsx"),
route("ai", "./routes/ai.ts"),
route('imagegen', "./routes/imagegen.ts")
] satisfies RouteConfig;
