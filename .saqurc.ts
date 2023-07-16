import { defineConfig } from 'saqu';
import autoCreateRoutes from '@saqu/auto-create-routes';
import autoCreateEnter from "@saqu/auto-create-enter"

export default defineConfig({
  entry: '!src/.cache/main.jsx',
  plugins: [
    new autoCreateRoutes({
      rootRoutes: "@/routes",
      presetsImport: `import Preview from "@/components/Preview";`,
      fileExt: "md",// 直接加载 md 文件
      renderConfig: ({ pathName, oFilePath }) => {
        return { configStr: `\t{ path:"${pathName}",element:<Preview path={()=>import("${oFilePath}")} /> },\n` }
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
