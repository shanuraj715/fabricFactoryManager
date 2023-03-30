// ** Icon imports
import { PlusBoxOutline, LogoutVariant } from 'mdi-material-ui'

import Search from 'mdi-material-ui/Magnify'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Challan'
    },
    {
      title: 'Create Challan',
      icon: PlusBoxOutline,
      path: '/challan/create',
      openInNewTab: false
    },
    {
      title: 'View Challan',
      icon: Search,
      path: '/challan/view',
      openInNewTab: false
    },
    {
      sectionTitle: 'Actions'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Logout',
      icon: LogoutVariant,
      path: '/logout'
    },
  ]
}

export default navigation
