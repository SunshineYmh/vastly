import React, { useRef } from 'react';
import { message, Divider } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { insertRoute } from '@/services/Gateway/gatewayapi';
import { useModel } from 'umi';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const GatewayRead = (props) => {
  const formRef = useRef();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  let GatewayData = props.drawerGatewayReadData;

  return (
    <DrawerForm
      title="网关信息"
      width={1000}
      formRef={formRef}
      visible={props.drawerGatewayRead}
      onCancel={() => {
        props.ondrawerGatewayReadCancel();
      }}
      onVisibleChange={props.onVisibleDrawerGatewayReadChange}
    >
      {/* <Divider orientation="left" plain>
        网关信息
      </Divider> */}

      <ProDescriptions
        editable={{}}
        column="1"
        formProps={{
          onValuesChange: (e, f) => console.log(f),
        }}
      >
        <ProDescriptions.Item dataIndex="routeName" label="路由名称" span="2">
          {GatewayData.routeName}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="isValid"
          label="路由状态"
          span="1"
          valueType="select"
          valueEnum={{
            0: {
              text: '正常',
              status: '0',
            },
            1: {
              text: '停用',
              status: '1',
            },
            2: {
              text: '注销',
              status: '2',
            },
            3: {
              text: '离线',
              status: '3',
            },
          }}
        >
          {GatewayData.isValid}
        </ProDescriptions.Item>
        <ProDescriptions.Item dataIndex="protocol" label="请求方式" span="2">
          {GatewayData.protocol}
        </ProDescriptions.Item>
        <ProDescriptions.Item dataIndex="host" label="请求地址" span="2">
          {GatewayData.host}
        </ProDescriptions.Item>
        <ProDescriptions.Item dataIndex="path" label="请求路径" span="2">
          {GatewayData.path}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="stripPrefix"
          label="请求根路径过滤器"
          valueType="number"
          span="2"
        >
          {GatewayData.stripPrefix}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="remarks"
          label="描述"
          valueType="textarea"
          span="2"
          width="500"
        >
          {GatewayData.remarks}
        </ProDescriptions.Item>
      </ProDescriptions>
    </DrawerForm>
  );
};

export default GatewayRead;
