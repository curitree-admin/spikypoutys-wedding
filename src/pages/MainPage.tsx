import React, { useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import mainImage from '../assets/main-image.jpg';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';

const Bride: React.FC = () => {
  // state for image modal
  const [clickedImg, setClickedImg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  // state for account modal
  const [ clickedAccountData, setClickedAccountData ] = useState<any>(null);
  const [ copiedAccount, setCopiedAccount ] = useState<string | null>(null);

  const navermaps = useNavermaps()

  const handleClick = (item: { link: string }, index: number) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };
  const accountClick = (account_data: { data: any }) => {
    setClickedAccountData(account_data.data);
  };

  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  
  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength-1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
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
                <div className='mainsection-text-1'>결혼식에 초대합니다</div>
                <div className='mainsection-text-2'>
                  최연준 <span className='text2-inner'> & </span> 고은경
                </div>
                <div className='mainsection-text-3'>2025. 11. 09 일요일 오전 11시<br/>수원 노보텔</div>
              </div>
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text1'>INVITATION</div>
              <div className='invitation-section-text2'>
                    저희 두 사람이 사랑과 믿음으로<br/>
                    한 가정을 이루게 되었습니다.<br/>
                    바쁘시더라도 부디 오셔서<br/>
                    저희의 앞날을 축복해 주시고<br/>
                    격려해 주시면 감사하겠습니다.
              </div>
              <div className='invitation-section-text3'>
                최진태・한미현<span className='text3-inner'>의 차남</span> 최연준
              </div>
              <div className='invitation-section-text3'>
                고형균・박명선<span className='text3-inner'>의 차녀</span> 고은경
              </div>
            </div>
            <div className='gallery-section'>
              <div className='gallery-section-text'>
                GALLERY
              </div>
            </div>
            <div>
              <div className='gallery-image-list-wrapper row'>
                  {data.data.map((item, index) => (
                    <div key={index} className='col-4'>
                      <img className='gallery-image' src={item.thumb_image_link} alt={item.text} onClick={()=> handleClick(item, index)}/>
                    </div>
                  ))}
              </div>
              {clickedImg && <ImageModal 
              clickedImg={clickedImg}
              handleRotationRight={handleRotationRight}
              handleRotationLeft={handleRotationLeft}
              setClickedImg={setClickedImg}
              />}
            </div>
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
                <div className='location-info-section-text1'>수원 노보텔</div>
                <div className='location-info-section-text2'>
                    경기 수원시 팔달구 덕영대로 90<br/>
                    2층 메인 홀<br/>
                    Tel. 031-547-6600
                </div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>대중교통</div>
              <ol className='location-how-publictrans-section-list'>
                <li>2호선 서울대입구역 3번 출구 → 5511,5513 버스 → 제2공학관(종점) 하차</li>
                <li>2호선 낙성대역 4번 출구 → 관악02 마을버스 → 제2공학관(종점) 하차</li>
                <li>신림선 관악산역 1번 출구 → 5511,5516 버스 → 제2공학관(종점) 하차</li>
              </ol>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>자가용</div>
              <div className='location-how2-section-text2'>
                네비게이션 이용 시 “이라운지 서울대점”을 입력하세요. (주차 2시간 무료)
              </div>
            </div>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳</div>
                <div 
                  className='congratulatory-section-btn' 
                  onClick={() => accountClick(groomAccountData)}>신랑측 계좌번호</div>
                <div 
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측 계좌번호</div>
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
