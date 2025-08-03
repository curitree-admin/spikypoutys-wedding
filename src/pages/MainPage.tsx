import React, { useState } from 'react';
import data from '../assets/image_data';
import pinIcon from '../assets/location-pin.png';
import mainImage from '../assets/main-image.jpeg';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import AccountModal from '../components/accountModal';
import { useTranslation } from '../i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Bride: React.FC = () => {
  // state for account modal
  const [ clickedAccountData, setClickedAccountData ] = useState<any>(null);
  const [ copiedAccount, setCopiedAccount ] = useState<string | null>(null);

  const t = useTranslation();

  const navermaps = useNavermaps()

    const accountClick = (account_data: { data: any }) => {
      setClickedAccountData(account_data.data);
    };

    return (
    <div className="">
      <div className='main container'>
        <div className="row justify-content-md-center">
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
              <div>
                <img src={mainImage} className='main-image' alt='t1'></img>
              </div>
              <div className='mainsection-text'>
                <div className='mainsection-text-1'>{t('invitationHeading')}</div>
                <div className='mainsection-text-2'>
                  최연준 <span className='text2-inner'> & </span> 고은경
                </div>
                <div className='mainsection-text-3' dangerouslySetInnerHTML={{ __html: t('dateLocation') }} />
              </div>
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text1'>INVITATION</div>
              <div className='invitation-section-text2'>
                {t('invitationIntro')}
              </div>
              <div className='invitation-section-text3'>
                {t('groomParents')}
              </div>
              <div className='invitation-section-text3'>
                {t('brideParents')}
              </div>
            </div>
            <div className='gallery-section'>
              <div className='gallery-section-text'>
                GALLERY
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2000 }}
              loop
            >
              {data.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <img className='gallery-image' src={item.main_image_link} alt={item.text} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='location-section'>
              <div className='location-section-text1'>
                LOCATION
              </div>
            </div>
            <div className='location-map-section'>
              <MapDiv
                style={{
                  width: '100%',
                  height: '350px'
                }}
              >
                <NaverMap 
                  defaultCenter={new navermaps.LatLng(37.44865592343993,126.95097244672262)}
                  defaultZoom={16}>
                  <Marker 
                  position={new navermaps.LatLng(37.44865592343993,126.95097244672262)} 
                  icon={
                    {
                      url : pinIcon,
                      size : new navermaps.Size(64,64)
                    }
                  }/>
                </NaverMap>
              </MapDiv>
            </div>
            <div className='location-info-section'>
                <div className='location-info-section-text1'>{t('locationName')}</div>
                <div className='location-info-section-text2' dangerouslySetInnerHTML={{ __html: t('locationAddress') }} />
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>{t('publicTransport')}</div>
              <ol className='location-how-publictrans-section-list'>
                <li>{t('transport1')}</li>
                <li>{t('transport2')}</li>
                <li>{t('transport3')}</li>
              </ol>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>{t('byCar')}</div>
              <div className='location-how2-section-text2'>
                {t('carText')}
              </div>
            </div>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>{t('congratulate')}</div>
                <div
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(groomAccountData)}>{t('groomAccount')}</div>
                <div
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>{t('brideAccount')}</div>
            </div>
            {clickedAccountData && <AccountModal 
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
              />}
          </div>

          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Bride;
