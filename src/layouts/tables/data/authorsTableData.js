/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// components
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import MDAvatar from 'components/MDAvatar'
import MDBadge from 'components/MDBadge'

// Images
import team2 from 'assets/images/team-2.jpg'
import team3 from 'assets/images/team-3.jpg'
import team4 from 'assets/images/team-4.jpg'

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  )

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  )

  return {
    columns: [
      { Header: 'کاربر', accessor: 'author', width: '45%', align: 'left' },
      { Header: 'نتیجه', accessor: 'status', align: 'center' },
      { Header: 'زمان', accessor: 'employed', align: 'center' },
    ],

    rows: [
      {
        author: <Author image={team2} name="علی حسینی" email="ali@rahmanism.ir" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="موفق"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            12:34 - 1401/08/18
          </MDTypography>
        ),
      },
      {
        author: (
          <Author image={team3} name="مجید احمدی" email="ahmadi@rahmanism.ir" />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="ناموفق"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            10:45 - 1401/08/18
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author image={team4} name="سروش سبحانی" email="sobhani@rahmanism.ir" />
        ),
        function: <Job title="Executive" description="Projects" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="موفق"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            09:22 - 1401/08/18
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author image={team3} name="مجید احمدی" email="ahmadi@rahmanism.ir" />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="موفق"
              color="success"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            13:20 - 1401/08/12
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author image={team3} name="سروش سبحانی" email="sobhani@rahmanism.ir" />
        ),
        function: <Job title="Manager" description="Executive" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="ناموفق"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="span"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            07:35 - 1401/08/08
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
      {
        author: (
          <Author image={team4} name="بهزاد ترکان" email="behzad@rahmanism.ir" />
        ),
        function: <Job title="Programator" description="Developer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent="ناموفق"
              color="dark"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        employed: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            10:12 - 1401/08/01
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="a"
            href="#"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      },
    ],
  }
}
