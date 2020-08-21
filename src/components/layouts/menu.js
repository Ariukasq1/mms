import React, {useContext, useState} from 'react';
import logo from '../../public/images/mms-logo.png'
import burger from '../../public/images/burger.png'
import Link from 'next/link'
import DataContext from "../DataContext";
import {Drawer} from "antd";
import mainStore from '../../stores'
import { useRouter } from 'next/router'

const MenuComponent = () => {
    const router = useRouter()
    let menu = useContext(DataContext)
    const {language, setLanguage} = mainStore()
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <nav
                className={"main-header flex flex-row justify-between p-2 w-full absolute top-0 left-0 right-0 z-10"}>
                <div className={"logo my-auto sm:w-12"}>
                    <img src={logo} alt={"logo"}/>
                </div>
                <div className={"menus flex flex-col  justify-around"}>
                    <div className={"topMenu sm:hidden self-end flex flex-row"}>
                        <div className={"topMenuList text-menuTextColor font-light text-sm "}>
                            {!menu ? <div>Loading</div> : menu.top_menu.items.map((item, index) => (
                                <Link href={`${item.slug}`} as={`/${item.slug}?lang=${language}`}>
                                    {/*<Link*/}
                                    {/*    href={{pathname: `${item.slug}`, query: {lang: language}}}>*/}
                                        <a key={index} className={"px-4 border-r border-menuTextColor"}>
                                            {item.title}
                                        </a>
                                    </Link>
                                )
                            )}
                        </div>
                        <div className={"topMenuLanguage mr-4"}>
                            <Link href={{ query: {lang: 'en'}}}>
                                <a onClick={() => setLanguage('en')}
                                   className={`mr-1 ${language === 'en' ? 'font-bold text-menuTextColor' : ''}`}>
                                    EN
                                </a>
                            </Link>
                            <span>/</span>
                            <Link href={{ query: {lang: 'mn'}}}>
                                <a onClick={() => setLanguage('mn')}
                                   className={`ml-1 ${language === 'mn' ? 'font-bold text-menuTextColor' : ''}`}>
                                    MN
                                </a>
                            </Link>

                        </div>
                    </div>
                    <div className={"bottomMenu  text-menuTextColor flex flex-row sm:justify-end"}>
                        <div className={"bottomMenuList sm:hidden  text-base font-extrabold border-r border-blue-700"}>
                            {!menu ? <div>Loading</div> : menu.bottom_menu.items.map((item, index) => (
                                <Link href={{pathname: `/${item.slug}`, query: {lang: language}}} as={`/${item.slug}?lang=${language}`}>
                                    {/*<Link*/}
                                    {/*    href={{pathname: `${item.slug}`, query: {lang: language}}}>*/}
                                        <a key={index} className={"mx-4"}>
                                            {item.title}
                                        </a>
                                    </Link>
                                )
                            )}
                        </div>
                        <div className={"bottomMenuSearchMenu flex flex-row  "}>
                            <a className={"mx-4"}>
                                <i className="fa fa-search" aria-hidden="true"/>
                            </a>
                            <a onClick={showDrawer} className={"mx-4 my-auto"}>
                                <img src={burger}/>
                            </a>
                        </div>
                        <Link href={{pathname: `/capabilities/[item]`, query: {slug: 'sourcing', lang: language}}} as={`/capabilities/sourcing?lang=${language}`}>
                            <a>Hello world</a>
                        </Link>
                        <Link href={{pathname: `/capabilities`, query: {lang: language}}} as={`/capabilities?lang=${language}`}>
                            <a>233232 1</a>
                        </Link>
                    </div>
                </div>
            </nav>
            <Drawer
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    backgroundColor: '#00488D',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                width={360}
            >

                <div className="drawerMenu self-center">
                    <div className="drawerLang my-4">
                        <Link href={{query: {lang: 'en'}}}>
                            <a onClick={() => setLanguage('en')}
                               className={`mx-4 ${language === 'en' ? 'font-bold' : ''}`}>
                                English
                            </a>
                        </Link>
                        <span> - </span>
                        <Link href={{pathname: {}, query: {lang: 'mn'}}}>
                            <a onClick={() => setLanguage('mn')}
                               className={`mx-4 ${language === 'mn' ? 'font-bold' : ''}`}>
                                Монгол
                            </a>
                        </Link>
                    </div>
                    {!menu ? <div>Loading</div> : menu.bottom_menu.items.map((item, index) => (
                            <div key={index} className="flex flex-col ">
                                <Link href={{pathname: `/${item.slug}`, query: {lang: language}}} as={`/${item.slug}?lang=${language}`}>
                                    <a className={"mx-4 font-bold"}>
                                        {item.title}
                                    </a>
                                </Link>
                                <div key={index} className="flex flex-col mb-6 ml-4">
                                    {item.child_items.map((children) => (
                                        <Link href={{pathname: `/${item.slug}/[item]`, query: {slug: `${children.slug}`, lang: language}}} as={`/${item.slug}/${children.slug}?lang=${language}`}>
                                        {/*<Link href={{pathname: `${item.slug}/${children.slug}`, query: {lang: language}}}>*/}
                                            <a key={children.ID} className={"mx-4"}>
                                                {children.title}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        )
                    )}
                </div>
                <div className="drawerSubMenu justify-between mb-10">
                    {!menu ? <div>Loading</div> : menu.top_menu.items.map((item, index) => (
                            <Link href={{pathname: `${item.slug}`, query: {lang: language}}}>
                                <a key={index} className={"px-4 font-bold border-r border-white"}>
                                    {item.title}
                                </a>
                            </Link>
                        )
                    )}
                </div>
            </Drawer>
        </div>
    );
};

export default MenuComponent;


