import { CopyToClipboard } from 'react-copy-to-clipboard';


interface AccountModalProps {
  clickedAccountData: any[];
  setClickedAccountData: React.Dispatch<React.SetStateAction<any[] | null>>;
  copiedAccount: string | null;
  setCopiedAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const AccountModal: React.FC<AccountModalProps> = ({clickedAccountData, setClickedAccountData, copiedAccount, setCopiedAccount}) => {

    const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const accountClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedAccountData(null);
            setCopiedAccount(null);
        }
    };

    const copyAccountNumber = async (account_number: string) => {
        // navigator.clipboard.writeText(account_number);
        setCopiedAccount(account_number);
        await delay(3000);
        setCopiedAccount(null);

    };

    return <>
    <div className="overlay dismiss" onClick={accountClick}>
        <div className="account-popup">
            <div className="account-info-area"></div>
            {clickedAccountData.map((item, index) => (
                <div key={index} className="account-info-each">
                    <div className="each-header">
                        <div className="each-title">{item.title}</div>
                    </div>
                    <hr className="each-line"></hr>
                    <div className="each-body">
                        <p className="each-account-text">
                            {item.bank_name} (예금주 : {item.account_owner}) <br/>
                            {item.account_number}
                        </p>
                        <CopyToClipboard
                        text={item.account_number}
                        onCopy={() => copyAccountNumber(item.account_number)}
                        >
                            <div className="each-copy-btn" 
                            >복사하기</div>
                        </CopyToClipboard>
                        
                    </div>
                    { copiedAccount === item.account_number && <div className="copy-success">복사되었습니다.</div> }
                    
                    
                </div>
            ))}
            <div className="account-popup-close dismiss" onClick={accountClick}>닫기</div>
        </div>
    </div>
    </>

}

export default AccountModal;
