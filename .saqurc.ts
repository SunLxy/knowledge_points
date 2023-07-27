import { defineConfig } from 'saqu';
import autoCreateEnter from "@saqu/auto-create-enter"
import authCreateTree from "@saqu/auto-create-tree-routes"

/**
 * 对数据进行分组
*/
const getFormatPath = (pathName: string) => {
  // 先分组数据
  const list = pathName.split("/")
  const lg = list.length
  const newList: string[] = []
  let lastName = ''
  let sortIndex = 0
  list.forEach((item, index) => {
    const [sort, first, end] = item.split("_")
    // 判断 first 是否存在，不存在，则取值第一个
    if (first) {
      newList.push(first)
    } else {
      newList.push(sort)
    }
    if ((lg - 1) === index) {
      lastName = end || first || sort
      if (/[0-9]+/.test(sort || '')) {
        sortIndex = Number((sort || "0"))
      } else {
        sortIndex = 0
      }
    }
  })
  return {
    name: lastName || "首页",
    path: newList.join("/"),
    sortIndex,
  }
}

export default defineConfig({
  entry: '!src/.cache/main.jsx',
  plugins: [
    new authCreateTree({
      rootRoutes: "@/routes",
      presetsImport: `import { SimplePreview } from "simple-markdown-preview";`,
      fileExt: "md",// 直接加载 md 文件
      /**处理父级菜单数据*/
      renderParent: (pathName) => {
        const { name, path, sortIndex } = getFormatPath(pathName)
        return { path: path, configStr: `name:"${name}",sort:${sortIndex}` }
      },
      /**处理子集菜单数据*/
      renderConfig: ({ pathName, oFilePath }) => {
        const { name, path, sortIndex } = getFormatPath(pathName)
        return { configStr: `\t{ path:"${path}",name:"${name}",sort:${sortIndex}, element:<SimplePreview path={()=>import("${oFilePath}")} /> },\n` }
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
