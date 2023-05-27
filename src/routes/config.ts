export const menus = [
  { name: "首页", path: "/" },
  {
    name: "html",
    children: [
      { name: "基础", path: "/html/basic" },
      { name: "H5", path: "/html/h5" },
    ]
  },
  {
    name: "css",
    children: [
      { name: "基础", path: "/css/basic" },
      { name: "CSS3", path: "/css/css3" },
    ]
  },
  {
    name: "javascript",
    children: [
      { name: "基础", path: "/js/basic" },
      { name: "进阶", path: "/js/advanced" },
    ]
  },
  { name: "typescript", path: "/ts", },
  {
    name: "react",
    children: [
      { name: "基础", path: "/react/basic" },
      { name: "进阶", path: "/react/advanced" },
    ]
  },
  { name: "react-native" },
  { name: "electron" },
  { name: "小程序" },
]