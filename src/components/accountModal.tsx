import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from '../i18n';


interface AccountModalProps {
  clickedAccountData: any[];
  setClickedAccountData: React.Dispatch<React.SetStateAction<any[] | null>>;
  copiedAccount: string | null;
  setCopiedAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const AccountModal: React.FC<AccountModalProps> = ({clickedAccountData, setClickedAccountData, copiedAccount, setCopiedAccount}) => {

    const t = useTranslation();
    
    const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const accountClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("dismiss")) {
            setClickedAccountData(null);
            setCopiedAccount(null);
        }
    };
    console.log('AccountModal clickedAccountData', clickedAccountData);
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
                        <div className="each-title">{t(item.title)}</div>
                    </div>
                    <hr className="each-line"></hr>
                    <div className="each-body">
                        <p className="each-account-text">
                            {item.bank_name} ({t('depositor')} : {item.account_owner}) <br/>
                            {item.account_number}
                        </p>
                        <CopyToClipboard
                        text={item.account_number}
                        onCopy={() => copyAccountNumber(item.account_number)}
                        >
                            <div className="each-copy-btn">
                            {t('copy')}
                            </div>
                        </CopyToClipboard>
                        
                    </div>
                    { copiedAccount === item.account_number && <div className="copy-success">{t('copied')}</div> }
                    
                    
                </div>
            ))}
            <div className="account-popup-close dismiss" onClick={accountClick}>{t('close')}</div>
        </div>
    </div>
    </>

}

export default AccountModal;
