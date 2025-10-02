/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// @mui material components
import Tooltip from '@mui/material/Tooltip'

// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDAvatar from 'components/MDAvatar'
import MDProgress from 'components/MDProgress'

// Images
import logoXD from 'assets/images/logo-ct.png'
import logoAtlassian from 'assets/images/logo-ct.png'
import logoSlack from 'assets/images/logo-ct.png'
import logoSpotify from 'assets/images/logo-ct.png'
import logoJira from 'assets/images/logo-ct.png'
import logoInvesion from 'assets/images/logo-ct.png'
import team1 from 'assets/images/logo-ct.png'
import team2 from 'assets/images/logo-ct.png'
import team3 from 'assets/images/logo-ct.png'
import team4 from 'assets/images/logo-ct.png'

import { Consts } from 'common/consts'

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: 'pointer',
            position: 'relative',

            '&:not(:first-of-type)': {
              ml: -1.25,
            },

            '&:hover, &:focus': {
              zIndex: '10',
            },
          }}
        />
      </Tooltip>
    ))

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  )

  return {
    columns: [
      { id: 'project', header: 'پروژه', accessorKey: 'project', width: '45%', align: 'left' },
      { id: 'members', header: 'اعضا', accessorKey: 'members', width: '15%', align: 'left' },
      { id: 'budget', header: 'بودجه', accessorKey: 'budget', align: 'center' },
      { id: 'complete', header: 'تکمیل', accessorKey: 'complete', align: 'center' },
    ],

    rows: [
      {
        project: 'testtt', // <Company image={logoXD} name={Consts.brand} />,
        members: 'Ryan Tompson, Romina Hadid, Alexander Smith, Jessica Doe',
        budget: '$14,000',
        complete: 'No',
      },
      {
        project: <Company image={logoAtlassian} name="اضافه کردن مسیر پیشرفت به برنامه داخلی" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team2, 'Romina Hadid'],
              [team4, 'Jessica Doe'],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </MDTypography>
        ),
        complete: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        project: <Company image={logoSlack} name="رفع خطاهای پلتفرم" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, 'Ryan Tompson'],
              [team3, 'Alexander Smith'],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            درست نیست
          </MDTypography>
        ),
        complete: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        project: <Company image={logoSpotify} name="راه‌اندازی اپلیکیشن موبایل ما" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team4, 'Jessica Doe'],
              [team3, 'Alexander Smith'],
              [team2, 'Romina Hadid'],
              [team1, 'Ryan Tompson'],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </MDTypography>
        ),
        complete: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        project: <Company image={logoJira} name="اضافه شدن صفحه قیمت گذاری جدید" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([[team4, 'Jessica Doe']])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $500
          </MDTypography>
        ),
        complete: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={25} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        project: <Company image={logoInvesion} name="طراحی جدید فروشگاه آنلاین" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [team1, 'Ryan Tompson'],
              [team4, 'Jessica Doe'],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </MDTypography>
        ),
        complete: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={40} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  }
}
