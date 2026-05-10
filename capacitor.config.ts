import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.isxarahh.petalsformother",
  appName: "Petals For Mother",
  webDir: "out",
  server: {
    url: "http://localhost:3000", // for dev
    cleartext: true,
  },
};

export default config;
