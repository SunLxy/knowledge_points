import { defineConfig } from 'saqu';
import autoCreateRoutes from '@saqu/auto-create-routes';
export default defineConfig({
  plugins: [new autoCreateRoutes({
    presetsImport: `import Preview from "@/components/Preview"`,
    fileExt: "md",// 直接加载 md 文件
    renderConfig: ({ pathName, oFilePath }) => {
      return { configStr: `\t{ path:"${pathName}",element:<Preview path={()=>import("${oFilePath}")} /> },\n` }
    }
  })],
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
