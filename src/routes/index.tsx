import styled, { css } from "styled-components";
import { useRoutes, RouteObject, Outlet, } from 'react-router';
import { NavLink } from "react-router-dom"
import { menus } from "./config"
import { useCallback } from "react";
import RouterConfig from "@/.cache/routes_config"
const config: RouteObject[] = [...RouterConfig];

const MenuWarpBase = styled.div`
  width: 200px;
  overflow-y:auto;
  font-size: 18px;
  color: var(--color-fg-default);
  padding-left: 20px;
  padding-top: 16px;
  box-sizing: border-box;
  margin-right: 15px;
`
const MenuChildBase = styled.div`
  margin-left: 10px;
  font-size: 18px;
`

const MenuItemLinkBase = styled(NavLink) <{ isChild: boolean }>`
  display: block;
  text-decoration: none;
  font-size: 18px;
  color: var(--color-fg-default);
  height: 35px;
  line-height: 35px;
  border-radius: 3px;
  transition:all 300ms;
  ${props => !props.isChild && css`
    font-weight: 600;
  `}
  &.active {
    color:purple;
    background-color: var(--color-neutral-muted);
    position: relative;
    padding-left: 8px;
    &::before{
      position: absolute;
      content: " ";
      background-color: purple;
      top: 0;
      left: 0;
      bottom: 0;
      width: 3px;
    }
  }
`
const MenuItemTitleBase = styled.div`
  height: 35px;
  line-height: 35px;
  font-size: 18px;
  font-weight: 600;
`

const MenuBase = styled.div``

const Menu = () => {
  const renderMenu = useCallback((childList: typeof menus, isChild: boolean = false) => {
    return childList.map((item, index) => {
      if (item.children) {
        return <MenuBase key={index}>
          <MenuItemTitleBase>{item.name}</MenuItemTitleBase>
          <MenuChildBase>
            {renderMenu(item.children, true)}
          </MenuChildBase>
        </MenuBase>
      }
      if (item.path) {
        return <MenuItemLinkBase isChild={isChild} key={index} to={item.path} >{item.name}</MenuItemLinkBase>
      }
      return <MenuItemTitleBase key={index}>{item.name}</MenuItemTitleBase>
    })
  }, [menus])

  return <MenuWarpBase>
    {renderMenu(menus)}
  </MenuWarpBase>
}

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
  const render = useRoutes(config);
  return <WarpBase>
    <Menu />
    <ContentBase>
      {render}
      <Outlet />
    </ContentBase>
  </WarpBase>

}
export default Warp;