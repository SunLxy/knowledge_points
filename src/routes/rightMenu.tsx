
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


export const useSimplePreview: SimplePreviewProps["useSimplePreview"] = (props) => {
  const { mdData, $domRef } = props

  const [menuStore] = useMenuStore()

  const { headings = [] } = mdData || {}

  const [firstItem] = headings || []

  const { children = [] } = firstItem || {}
  const location = useLocation()
  const navigate = useNavigate()
  const s = useRef()

  const anchor = useMemo(() => {
    if (location.search) {

      return getAnchor(location.search)
    }
    return undefined
  }, [location.search])

  const scrollTo = (anchor: string) => {
    try {
      const $dom = $domRef.current.querySelector(`#${anchor}`)
      if ($dom) {
        const { top: parentTop = 0 } = $domRef.current.getBoundingClientRect()
        const { top } = $dom.getBoundingClientRect()
        $domRef.current.scrollTo({ behavior: "smooth", top: top - parentTop })
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
  }, [anchor])

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