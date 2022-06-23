import React, { useRef } from 'react';
import { message, Divider } from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const GatewayForm = (props) => {
  const {
    drawerGatewayReadData,
    drawerGatewayType,
    drawerGatewayForm,
    onVisibleChange,
    onDone,
    onSubmit,
    children,
  } = props;
  const formRef = useRef();
  let readonlyb = false;
  let layouttype = 'vertical';
  let titled = '网关信息';
  let v_id = '';
  if (drawerGatewayType == 'add') {
    readonlyb = false;
    layouttype = 'vertical';
    titled = '网关添加';
  } else if (drawerGatewayType == 'read') {
    readonlyb = true;
    layouttype = 'horizontal';
    titled = '网关信息';
  } else if (drawerGatewayType == 'update') {
    readonlyb = false;
    layouttype = 'vertical';
    titled = '网关信息修改';
    v_id = drawerGatewayReadData.id;
  }
  console.log(drawerGatewayType, '===11==', drawerGatewayReadData);

  if (!drawerGatewayForm) {
    return null;
  }
  return (
    <DrawerForm
      title={titled}
      width={1000}
      formRef={formRef}
      // {...formItemLayout}
      layout={layouttype}
      visible={drawerGatewayForm}
      initialValues={drawerGatewayReadData}
      // onCancel={() => {
      //   onDone();
      // }}
      drawerProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
      }}
      onVisibleChange={onVisibleChange}
      onFinish={async (values) => {
        if (v_id != null && v_id != '' && v_id != ' ') {
          values.id = v_id;
        }
        onSubmit(values);
      }}
    >
      {/* <Divider orientation="left" plain>
        网关信息
      </Divider> */}
      <ProForm.Group>
        <ProFormText
          name="routeName"
          width="md"
          label="路由名称"
          tooltip="最长为 100 位"
          placeholder="请输入路由名称"
          readonly={readonlyb}
          // value={GatewayData.routeName}
          rules={[{ required: true, message: '请输入路由名称!' }]}
        />
        {drawerGatewayType != 'add' ? (
          <ProFormText
            name="id"
            label="路由id"
            readonly
            // value={GatewayData.routeName}
          />
        ) : null}
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="protocol"
          width="md"
          label="请求方式"
          tooltip="默认http方式"
          readonly={readonlyb}
          // value={GatewayData.protocol}
          rules={[{ required: true, message: '请输入请求方式!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="host"
          width="md"
          label="请求地址"
          tooltip="格式：127.0.0.1:8080"
          placeholder="请输入请求地址和端口"
          readonly={readonlyb}
          // value={GatewayData.host}
          rules={[{ required: true, message: '请输入请求地址和端口!' }]}
        />
        <ProFormText
          name="path"
          width="md"
          label="请求路径"
          tooltip="格式示例：/api/**"
          placeholder="请求根路径"
          readonly={readonlyb}
          // value={GatewayData.path}
          rules={[{ required: true, message: '请求根路径!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name="stripPrefix"
          width="md"
          label="路径过滤"
          tooltip="请求根路径过滤前缀数量"
          readonly={readonlyb}
          // value={GatewayData.stripPrefix}
          min={0}
          extra="过滤器StripPrefix，作用是去掉请求路径的最前面n个部分截取掉。StripPrefix=1就代表截取路径的个数为1，比如前端过来请求/test/good/1/view，匹配成功后，路由到后端的请求路径就会变成http://localhost:8888/good/1/view。"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name="remarks"
          label="描述"
          tooltip="信息描述"
          placeholder="请输入网关信息描述"
          maxLength="300"
          width="lg"
          readonly={readonlyb}
          // value={GatewayData.remarks}
        />
      </ProForm.Group>
      <Divider orientation="left">网关超时策略</Divider>
      <ProForm.Group>
        <ProFormDigit
          name="timeout"
          width="sm"
          label="超时时间"
          tooltip="单位秒，默认30s"
          readonly={readonlyb}
          // value={GatewayData.timeout}
          min={0}
          max={180}
          extra="设置超时时间，默认30秒；超时后接口服务进行熔断降级策略."
        />
      </ProForm.Group>
      <Divider orientation="left">网关访问限流策略</Divider>
      <ProForm.Group>
        <ProFormDigit
          name="burstCapacity"
          width="sm"
          label="访问次数"
          tooltip="每秒最大访问次数"
          readonly={readonlyb}
          // value={GatewayData.burstCapacity}
          min={0}
          max={100}
          extra="接口每秒最大访问次数，令牌桶算法的每秒总容量；当值为0时，不限流."
        />
        <ProFormDigit
          name="replenishRate"
          width="sm"
          label="填充速率"
          tooltip="令牌桶算法的填充速率"
          readonly={readonlyb}
          initial // value={GatewayData.replenishRate}
          min={0}
          max={100}
          extra="接口每秒令牌桶算法的填充速率，访问频率，1个/s."
        />
        <ProFormDigit
          name="requestedTokens"
          width="sm"
          label="消耗令牌数"
          tooltip="每个请求消耗的令牌数"
          readonly={readonlyb}
          // value={GatewayData.requestedTokens}
          min={0}
          max={100}
          extra="令牌桶算法:每个请求消耗的token数，1个/次."
        />
      </ProForm.Group>
      <Divider orientation="left">Swageer OpenApi规范接口信息</Divider>
      <ProForm.Group>
        <ProFormSelect
          name="openApiType"
          label="接口生成方式"
          tooltip="接口生成方式：SwaggerUri、SwaggerJson、自定义"
          readonly={readonlyb}
          // value={GatewayData.isOpenApi}
          valueEnum={{
            0: {
              text: 'SwaggerUri',
              status: '0',
            },
            1: {
              text: 'SwaggerJson',
              status: '1',
            },
            2: {
              text: '自定义',
              status: '2',
            },
          }}
          extra="接口生成方式：SwaggerUri、SwaggerJson、自定义."
          rules={[{ required: true, message: '请选择接口方式!' }]}
        />
        <ProFormText
          name="swaggerUri"
          width="md"
          label="swaggerUri"
          tooltip="格式示例：http://127.0.0.1:8080/v3/api-doc*"
          placeholder="http://127.0.0.1:8080/v3/api-doc"
          readonly={readonlyb}
          // value={GatewayData.swaggerUri}
        />
        <ProForm.Group>
          <ProFormTextArea
            name="swaggerJson"
            label="swaggerJson"
            tooltip="服务OpenApi规范json"
            placeholder="服务OpenApi规范json"
            width={500}
            readonly={readonlyb}
            // value={GatewayData.swaggerJson}
          />
        </ProForm.Group>
      </ProForm.Group>
    </DrawerForm>
  );
};

export default GatewayForm;
