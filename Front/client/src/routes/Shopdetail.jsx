import { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom"
import styles from "./Shopdetail.module.css"
import { useDispatch, useSelector } from 'react-redux';

import { ownerOf, tokenURI, nftPrice, IsSale } from "../apis/contract";

function Shopdetail() {
	const { id } = useParams();
	const usersItems = useSelector((state) => state.users);

	const [price , setPrice] = useState()
	const [owner , setOwner] = useState(false)
	const [isowner , setIsOwner] = useState(false)
	const [nftdata, setNftdata] = useState()
	const [inPrice, setInPrice] = useState(0)
	const [isSale, setIsSale] = useState()
	const onChangeprice = (event) => {
		setInPrice(event.target.value);
	  }

	useEffect(()=> {
		ownerOf(id , (error, responseData) => {
			if (error) {
				console.error('ownerOf 정보 실패');

			  } else {
				console.log('ownerOf 정보 성공: ', responseData.data.owner);
				setOwner(responseData.data.owner)
				if(usersItems.account === responseData.data.owner){
					setIsOwner(true)
					console.log(isowner)
				}else{
					setIsOwner(false)
					console.log(isowner)
				}
			  }
		})
		nftPrice(id, (error, responseData) => {
			if (error) {
				console.error('nftPrice 정보 실패');

			  } else {
				console.log('nftPrice 정보 성공: ', responseData.data.nftPrice);
				setPrice(responseData.data.nftPrice)
			  }
		})
		IsSale(id, (error, responseData) => {
			if (error) {
				console.error('IsSale 정보 실패');

			  } else {
				console.log('IsSale 정보 성공: ', responseData.data.IsSale);
				setIsSale(responseData.data.IsSale)
			  }
		})
		const fetchURI = async () => {
		  try {
			const URI = await new Promise((resolve, reject) => {
			  tokenURI(id, (error, responseData) => {
				if (error) {
				  console.error('tokenURI 정보 실패');
				  reject(error);
				} else {
				  console.log('tokenURI 정보 성공: ', responseData.data.URI);
				  resolve(responseData.data.URI);
				}
			  });
			});
			
			const jsonData = await fetchData(URI); // fetchURI가 완료되면 fetchData 호출
			setNftdata(jsonData); // 데이터 설정
		  } catch (error) {
			console.error('Error fetching URI:', error);
		  }
		};
		fetchURI();
		
	  }, [id]);
	  

	  const fetchData = async (url) => {
		try {
		  const response = await fetch(url);
		  const jsonData = await response.json();
		  console.log("nft",jsonData); // JSON 데이터를 콘솔에 출력
		  setNftdata(jsonData)
		  return jsonData
		  // 여기에서 데이터를 처리할 수 있습니다.
		} catch (error) {
		  console.error('Error fetching data:', error);
		}
	  };



	  
 
  return (
	<div>
		{nftdata ? (
		<div>
			{!isowner ? (
				<div>
					<img className={styles.heartp} alt="heartp" src="/img/heartp.gif" />

					<img className={styles.fu} alt="fu" src={nftdata.image} />
					<div className={styles.box}>
						<div className={styles.sbox} />
						<h1 className={styles.detailtext}>{nftdata.description}</h1>
						<h1 className={styles.name}>Owner:</h1>
						<div className={styles.owner}>{owner}</div>
						<h1 className={styles.price}>Price: {price} DHT</h1>
						<hr className={styles.hrr} />
						<hr className={styles.hrrr} />
						{isSale ? 
							(<button className={styles.buy}>Buy</button>)
							: (
								<></>
							)}
						
						<div className={styles.text}>{nftdata.name}</div>
						<div className={styles.titletext}>{nftdata.name}</div>
					</div>
				
					<Link to="/shop"><button className={styles.backarrow}>➤</button></Link>
					<h1 className={styles.FurnitureDetails}>Furniture Details</h1>	
					<img className={styles.upheart} alt="upheart" src="/img/upheart.gif" />
					<img className={styles.upheart2} alt="upheart" src="/img/upheart.gif" />
				</div>
			) : (
				<div>
					<img className={styles.heartp} alt="heartp" src="/img/heartp.gif" />

					<img className={styles.fu} alt="fu" src={nftdata.image} />
					<div className={styles.box}>
						<div className={styles.sbox} />
						<h1 className={styles.detailtext}>{nftdata.description}</h1>
						<h1 className={styles.name}>Owner:</h1>
						<div className={styles.owner}>{owner}</div>
						<div>
							<h1 className={styles.price}>Price:</h1>
							<input 
								className={styles.priceInput}
								type="number" 
            					placeholder="" 
            					name="inprice"
            					value={inPrice}
            					onChange={onChangeprice}
							></input>
							<div className={styles.dht}>DHT</div>
						</div>
						
						<hr className={styles.hrr} />
						<hr className={styles.hrrr} />
						<button className={styles.buy}>Sale</button>
						<div className={styles.text}>{nftdata.name}</div>
						<div className={styles.titletext}>{nftdata.name}</div>
					</div>

					<Link to="/shop"><button className={styles.backarrow}>➤</button></Link>
					<h1 className={styles.FurnitureDetails}>Furniture Details</h1>	
					<img className={styles.upheart} alt="upheart" src="/img/upheart.gif" />
					<img className={styles.upheart2} alt="upheart" src="/img/upheart.gif" />
				</div>
			)
			}
			
		</div>
		) :
			<div>
				<img className={styles.upheart} alt="upheart" src="/img/upheart.gif" />
				<img className={styles.upheart2} alt="upheart" src="/img/upheart.gif" />
			</div>
		}
	</div>
	)
}

export default Shopdetail;