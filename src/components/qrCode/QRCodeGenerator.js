import {useState,useEffect} from 'react';
import QRCode from 'qrcode';

import Error from 'components/error/Error';

import './QRCode.css';

const QRCodeGenerator=()=>{
    const [error,setError]=useState("");
    const [qrCodeData,setQrCodeData]=useState({
		url: "",
		size: 300
	});
    const {url,size}=qrCodeData;
    const [qrCodeUrl,setQrCodeUrl]=useState("");

    useEffect(()=>{
        setTimeout(()=>{
            setQrCodeUrl("");
        },10000);
    },[qrCodeUrl]);

    const changeHandler=(e)=>{
		setError("");

		setQrCodeData({
			...qrCodeData,
			[e.target.name]: e.target.value
		});
	};

    const submitHandler=async(e)=>{
        const urlPattern=/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
		e.preventDefault();

		try{
            //檢查全部欄位是否填寫
            if(!url || !size){
                return setError("請填寫完整");
            }
            //檢查網址是否符合格式
            if(!url.match(urlPattern)){
                return setError("網址格式錯誤");
            }

            const res=await QRCode.toDataURL(url,{
                width: size,
                margin: 2
            });
            setQrCodeUrl(res);

            setQrCodeData({
                url: "",
                size: 300
            });
        }
        catch(err){
            console.log(err);
        }
	};

    return (
        <div className="qrcode">
            <form className="qrcode-form" onSubmit={submitHandler} noValidate>
                <h2 className="qrcode-form-title">QRCode 產生器</h2>
                {error && <Error error={error} setError={setError} />}
                <div className="input-group">
                    <label htmlFor="url">網址:</label>
                    <input type="text" className="input" id="url" name="url" placeholder="請輸入網址" autoComplete="off" value={url} onChange={changeHandler} />
                </div>
                <div className="input-group">
                    <label htmlFor="size">尺寸:</label>
                    <select className="input" id="size" name="size" value={size} onChange={changeHandler}>
                        <option value={300}>300*300</option>
                        <option value={400}>400*400</option>
                        <option value={500}>500*500</option>
                        <option value={600}>600*600</option>
                        <option value={700}>700*700</option>
                        <option value={800}>800*800</option>
                    </select>
                </div>
                <button type="submit" className="btn-submit">送出</button>
            </form>
            <div className="qrcode-success">
                {qrCodeUrl && <div className="qrcode-image"><img src={qrCodeUrl} alt="qrcode" /><a href={qrCodeUrl} download="QRCode.png" className="download-link">下載QRCode</a></div>}
            </div>
        </div>
    );
}

export default QRCodeGenerator;