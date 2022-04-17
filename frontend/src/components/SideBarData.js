import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

export const SideBarData = [
    {
        title: 'Education',
        path: '/education',
        icon: <FaIcons.FaUserGraduate/>,
        cName: 'nav-text'
    },
    {
        title: 'Work',
        path: '/work',
        icon: <MdIcons.MdWork/>,
        cName: 'nav-text'
    },
    {
        title: 'Activities',
        path: '/activities',
        icon: <FaIcons.FaRunning/>,
        cName: 'nav-text'
    },
    {
        title: 'Personal',
        path: '/personal',
        icon: <RiIcons.RiMentalHealthFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Other',
        path: '/other',
        icon: <FaIcons.FaRandom/>,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/',
        icon: <FaIcons.FaSignOutAlt/>,
        cName: 'nav-text'
    }

]