import { defineConfig } from 'saqu';
import autoCreateRoutes from '@saqu/auto-create-routes';
import autoCreateEnter from "@saqu/auto-create-enter"

export default defineConfig({
  entry: '!src/.cache/main.jsx',
  plugins: [
    new autoCreateRoutes({
      rootRoutes: "@/routes",
      presetsImport: `import { SimplePreview } from "simple-markdown-preview";`,
      fileExt: "md",// 直接加载 md 文件
      renderConfig: ({ pathName, oFilePath }) => {
        return { configStr: `\t{ path:"${pathName}",element:<SimplePreview path={()=>import("${oFilePath}")} /> },\n` }
      }
    }),
    new autoCreateEnter()
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: "@saqu/loader-md-react-preview",
        type: 'typescript',
      },
    ],
  },
});
