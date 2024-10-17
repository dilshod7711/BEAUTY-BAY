import Banner from '../../components/banner/Banner'
import Beauty from '../../components/beauty/Beauty'
import Brand from '../../components/brand/Brand'

import Products from '../../components/products/Products'
import Section from '../../components/section/Section'
import Shelf from '../../components/Shelf/Shelf'
import BodyCare from  "../../components/BodyCare/BodyCare"
import Community from '../../components/Community/Community'
import Brand2 from '../../components/brand2/Brand2'

const Home = () => {
  return (
    <div>
     
        <Banner/>
        <Products/>
        <Section/>
        <Brand/>
        <Shelf/>
        <Beauty/>
        <BodyCare/>
        <Brand2/>
        <Community/>
      
    </div>
  )
}

export default Home