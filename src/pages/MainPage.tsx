import React, { useEffect, useState } from 'react';
import data from '../assets/image_data';
import pinIcon from '../assets/location-pin.png';
import mainImage from '../assets/main-image.jpeg';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AccountModal from '../components/accountModal';
import { useTranslation } from '../i18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

const Bride: React.FC = () => {
  // state for account modal
  const [ clickedAccountData, setClickedAccountData ] = useState<any>(null);
  const [ copiedAccount, setCopiedAccount ] = useState<string | null>(null);
  console.log('clickedAccountData', clickedAccountData);
  const t = useTranslation();

  useEffect(() => {
    const { naver } = window as any;
    if (!naver) return;

    const latitude = 37.268392;
    const longitude = 126.9991161;
    const mapOptions = {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 18,
    };

    const map = new naver.maps.Map('map', mapOptions);

    new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map,
      icon: {
        url: pinIcon,
        size: new naver.maps.Size(30, 30),
        scaledSize: new naver.maps.Size(30, 30),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(15, 30),
      },
    });
  }, []);

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
                <div className='mainsection-text-3' dangerouslySetInnerHTML={{ __html: t('locationName') }} />
              </div>
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text2' dangerouslySetInnerHTML={{ __html: t('invitationIntro') }} />
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
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 2000 }}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop
              className="gallery-swiper"
            >
              {data.data.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="gallery-image-container">
                    <img className="gallery-image"  src={item.main_image_link} alt={item.text}/>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='location-section'>
              <div className='location-section-text1'>
                장소
              </div>
            </div>
            <div id='map' className='location-map-section'>
            </div>
            <div className='location-info-section'>
                <div className='location-info-section-text1'>{t('locationName')}</div>
                <div className='location-info-section-text2' dangerouslySetInnerHTML={{ __html: t('locationAddress') }} />
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>{t('byCar')}</div>
              <div className='location-how2-section-text2' dangerouslySetInnerHTML={{ __html: t('carText') }}></div>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>{t('byBus')}</div>
              <div className='location-how2-section-text2'>
                {t('busText')}
              </div>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>{t('byTrain')}</div>
              <div className='location-how2-section-text2'>
                {t('trainText')}
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
