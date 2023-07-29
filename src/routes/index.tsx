import styled from "styled-components";
import { Outlet, useNavigate } from 'react-router';
import SimpleMenu from "@carefrees/simple-menu"
import { useMemo } from "react";
// @ts-ignore
import routes_config from "@/.cache/routes_config"

const WarpBase = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: var(--color-canvas-default);
  padding: 15px 100px;
`
const ContentBase = styled.div`
  flex: 1;
  overflow-y: auto;
`

const Warp = () => {
  const [itemData] = routes_config || []
  const { children: menus = [] } = itemData || {}

  const navigate = useNavigate()

  const onChange = (item: any) => {
    if (item?.path && !item?.isSubMenu) {
      navigate(item.path)
    }
  }
  const render = useMemo(() => {
    return <SimpleMenu onChange={onChange} items={menus} labelKey="name" />
  }, [menus])

  return <WarpBase>
    {render}
    <ContentBase>
      <Outlet />
    </ContentBase>
  </WarpBase>

}
export default Warp;