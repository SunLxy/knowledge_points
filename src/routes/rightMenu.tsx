
import { SimplePreviewProps } from "simple-markdown-preview"
import SimpleMenu from "@carefrees/simple-menu"
import { useMenuStore } from "@carefrees/simple-menu/lib/store"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useMemo, useRef } from "react"

const getAnchor = (search: string) => {
  const newSearch = decodeURIComponent(search).replace(/^\?/, "").split("&").filter(Boolean)
  let anchor: string | undefined = undefined
  const lg = newSearch.length;
  for (let index = 0; index < lg; index++) {
    const element = newSearch[index];
    const [key, ...rest] = element.split("=")
    if (key === "anchor") {
      anchor = rest.join("=")
      break;
    }
  }
  return anchor
}

interface ListDOMType {
  value: string;
  $dom: Element | null
}


export const useSimplePreview: SimplePreviewProps["useSimplePreview"] = (props) => {
  const { mdData, $domRef } = props
  const location = useLocation()
  const navigate = useNavigate()
  const [menuStore] = useMenuStore()
  const { headings = [], headingsList } = mdData || {}
  const refListDom = useRef<ListDOMType[]>([])
  const timerRef = useRef<NodeJS.Timeout>()
  const refStore = useRef({ headingsList, menuStore })
  refStore.current = {
    headingsList,
    menuStore
  }

  const [firstItem] = headings || []

  const { children = [] } = firstItem || {}


  const anchor = useMemo(() => {
    if (location.search) {
      return getAnchor(location.search)
    }
    return undefined
  }, [location.search])

  console.log("location===>", location, window.location)

  const scrollTo = (anchor: string) => {
    try {
      const $dom = $domRef.current?.querySelector(`#${anchor}`)
      if ($dom) {
        const offsetTop = ($dom as any).offsetTop
        $domRef.current?.scrollTo({ behavior: "smooth", top: offsetTop })
        menuStore.updateValue(anchor)
      }
    } catch (err) {
      console.log("获取跳转节点失败", err)
    }
  }

  useEffect(() => {
    let timer: any;
    if (anchor) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        scrollTo(anchor)
      }, 300)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [location.search, anchor])

  const onScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    // console.log("===============================>")
    // console.log("scrollTop===>", scrollTop)
    clearTimeout(timerRef.current)
    const parentTop = $domRef.current.getBoundingClientRect().top;
    const lg = (refStore.current.headingsList || []).length
    let nextIndex = 0
    let index = 0
    for (index; index < lg; index++) {
      const item = refStore.current.headingsList[index];
      const $dom = $domRef.current.querySelector(`#${item.value}`)
      const offsetTop = ($dom as any).offsetTop;

      if (scrollTop >= (offsetTop - parentTop) || scrollTop >= (offsetTop + parentTop)) {
        nextIndex = index
      }
    }
    const preValue = refStore.current.menuStore.getValue()
    let item = refStore.current.headingsList[nextIndex > 0 ? nextIndex : 1]
    if (item && item.value !== preValue) {
      timerRef.current = setTimeout(() => {
        refStore.current.menuStore.updateValue(item.value)
        // const urls = window.location.pathname.replace(/\/$/, "") + "/" + ((window.location.hash || "/#/").replace(/^\//, ''))
        console.log("urls", window.location)
        // window.location.assign(urls + `?anchor=${item.value}`)
        /**替换url地址*/
        // window.history.replaceState(undefined, document.title, urls + `?anchor=${item.value}`)
      }, 100)
    }
  }

  useEffect(() => {
    if ($domRef.current)
      $domRef.current.addEventListener("scroll", onScroll)
    return () => {
      if ($domRef.current)
        $domRef.current.removeEventListener("scroll", onScroll)
    }
  }, [$domRef.current])

  const onChange = (item: any) => {
    if (item && item.value) {
      navigate(location.pathname + `?anchor=${item.value}`, { replace: true })
    }
  }

  const rightRender = useMemo(() => {
    return <SimpleMenu menu={menuStore} onChange={onChange} items={children} labelKey="value" valueKey="value" />
  }, [JSON.stringify(children)])

  return { rightRender }
}