import { Form, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import request from '@/utils/request';
import { getOssSignature } from '@/service/api';
import { useRequest } from 'ahooks';

interface IUpload {
  onIChange: (names: string[]) => void
}

const UploadTool: any = ({onIChange}:IUpload) => {
  const { run } = useRequest(getOssSignature);
  const [ossData, setOssData] = useState<API.Oss>();
  useEffect(() => {
    init();
  }, []);

  const beforeUpload = async (file: any) => {
    let { expire } = ossData!;
    expire = expire! * 1000;
    if (expire < Date.now()) {
      await init();
    }
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = ossData!.dir + filename;
    return file;
  };

  const extra = (file: any) => {
    return {
      key: file.url,
      OSSAccessKeyId: ossData!.accessId,
      policy: ossData!.policy,
      Signature: ossData!.signature,
    };
  };
  const init = () => {
    run().then(success => {
      setOssData(success.data);
    }).catch(error => {

    });
  };
  const onChange = (file:any) => {
    const list = file.fileList.map((item:any)=>ossData!.host+"/"+item.url);
    onIChange([...list])
  };
  return (
    <>
      <Upload
        name={'file'}
        listType={'picture'}
        action={ossData?.host}
        onChange={onChange}
        data={extra}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default UploadTool;
