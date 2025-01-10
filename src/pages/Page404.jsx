import LeftNav from '../components/LeftNav/LeftNav'
import TopNav from '../components/TopNav/TopNav'
import PropTypes from 'prop-types'
import '../styles/App.scss'

const Page404 = ({ errorMsg }) => {
  return (
    <>
      <TopNav />
      <LeftNav />
      <div className="Page404_content">
        {errorMsg ? (
          <p>{errorMsg}</p>
        ) : (
          <>
            <h1>404</h1>
            <h2>Oups! La page que vous demandez n&apos;existe pas.</h2>
          </>
        )}
      </div>
    </>
  )
}

Page404.propTypes = {
  errorMsg: PropTypes.string,
}

export default Page404
