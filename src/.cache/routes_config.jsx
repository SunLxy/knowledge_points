import Preview from "@/components/Preview"


export default [
{ path:"/ts",element:<Preview path={()=>import("@/pages/ts/index.md")} /> },
	{ path:"/css/css3",element:<Preview path={()=>import("@/pages/css/css3/index.md")} /> },
	{ path:"/css/basic",element:<Preview path={()=>import("@/pages/css/basic/index.md")} /> },
	{ path:"/js/advanced",element:<Preview path={()=>import("@/pages/js/advanced/index.md")} /> },
	{ path:"/js/basic",element:<Preview path={()=>import("@/pages/js/basic/index.md")} /> },
	{ path:"/html/basic",element:<Preview path={()=>import("@/pages/html/basic/index.md")} /> },
	{ path:"/html/h5",element:<Preview path={()=>import("@/pages/html/h5/index.md")} /> },
	{ path:"/react/basic",element:<Preview path={()=>import("@/pages/react/basic/index.md")} /> },
	{ path:"/react/advanced",element:<Preview path={()=>import("@/pages/react/advanced/index.md")} /> },];
