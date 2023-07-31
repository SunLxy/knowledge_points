
import { SimplePreviewProps } from "simple-markdown-preview"
import SimpleMenu from "@carefrees/simple-menu"
import { useMemo } from "react"

export const useSimplePreview: SimplePreviewProps["useSimplePreview"] = (props) => {
  const { mdData, $domRef } = props

  const { headings = [] } = mdData || {}

  const [firstItem] = headings || []

  const { children = [] } = firstItem || {}

  const onChange = (item: any) => {
    if (item && item.value) {
      const $dom = $domRef.current.querySelector(`#${item.value}`)
      if ($dom) {
        const { top: parentTop = 0 } = $domRef.current.getBoundingClientRect()
        const { top } = $dom.getBoundingClientRect()
        $domRef.current.scrollTo({ behavior: "smooth", top: top - parentTop })
      }
    }
  }

  const rightRender = useMemo(() => {
    return <SimpleMenu onChange={onChange} items={children} labelKey="value" valueKey="value" />
  }, [JSON.stringify(children)])

  return { rightRender }
}