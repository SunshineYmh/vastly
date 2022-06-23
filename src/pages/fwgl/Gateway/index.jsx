import React, { useState, useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import {
  selectRoute,
  updateRoute,
  insertRoute,
  deletePulsRoute,
  routeJkModel,
} from '@/services/Gateway/gatewayapi';
import { useIntl, FormattedMessage, useModel, history } from 'umi';
import GatewayForm from './components/GatewayForm';

export default () => {
  const actionRef = useRef();
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;
  const [type, setType] = useState('account');
  const [editableKeys, setEditableRowKeys] = useState([]);

  const [drawerGatewayForm, setDrawerGatewayForm] = useState();
  const [drawerGatewayReadData, setDrawerGatewayReadData] = useState(undefined);
  const [drawerGatewayType, setDrawerGatewayType] = useState('read');

  const drawerGatewayDone = () => {
    setDrawerGatewayForm(false);
    setDrawerGatewayReadData({});
    actionRef.current.reload();
  };

  const drawerGatewaySubmit = async (values) => {
    if (drawerGatewayType == 'add') {
      values.uid = currentUser.uid;
      console.log(values);
      const addsub = await insertRoute({ ...values });
      if (addsub.success) {
        setDrawerGatewayForm(false);
        setDrawerGatewayReadData({});
        message.success('提交成功');
        // 刷新
        actionRef.current.reload();
        // 不返回不会关闭弹框
        return true;
      } else {
        message.error(addsub.mag);
        return false;
      }
    } else if (drawerGatewayType == 'read') {
      setDrawerGatewayForm(false);
      setDrawerGatewayReadData({});
      return true;
    } else if (drawerGatewayType == 'update') {
      const updatesub = await updateRoute({ ...values, type });
      if (updatesub.success) {
        setDrawerGatewayForm(false);
        setDrawerGatewayReadData({});
        message.success('修改成功');
        actionRef.current.reload();
        // 不返回不会关闭弹框
        return true;
      } else {
        message.error('修改失败');
        return false;
      }
    }
  };

  const renderRemoveRoute = (key, routeName) => {
    Modal.confirm({
      title: '删除路由',
      content: `确认要删除${routeName}路由吗?`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        let params = [];
        let datas = {
          id: key,
        };
        params.push(datas);
        const delsub = await deletePulsRoute({ params });
        if (delsub.success) {
          message.success('修改成功');
          actionRef.current.reload();
        } else {
          message.error('删除失败');
        }
      },
    });
  };

  const rendeCreateRoute = async (route) => {
    const model = await routeJkModel({ ...route });
    if(model.success){
      message.success('接口同步完成');
      actionRef.current.reload();
    } else {
      message.error(model.msg);
    }
  };

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '路由名称',
      dataIndex: 'routeName',
      copyable: true,
      ellipsis: true,
      tip: '路由名称',
      width: 200,
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '此项为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '状态',
      dataIndex: 'isValid',
      filters: true,
      onFilter: true,
      valueType: 'select',
      width: 100,
      valueEnum: {
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
      },
    },
    // {
    //   title: '请求方式',
    //   dataIndex: 'protocol',
    //   copyable: true,
    //   ellipsis: true,
    //   tip: '请求方式',
    //   width: 100,
    // },
    {
      title: '请求地址',
      dataIndex: 'host',
      copyable: true,
      ellipsis: true,
      tip: '请求地址',
      width: 200,
    },
    {
      title: '请求路径',
      dataIndex: 'path',
      copyable: true,
      ellipsis: true,
      tip: '请求路径',
      width: 200,
    },
    {
      title: '超时时间',
      dataIndex: 'timeout',
      valueType: 'digit',
      sorter: true,
      hideInSearch: true,
      width: 80,
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createDate',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '接口生成方式',
      dataIndex: 'openApiType',
      sorter: true,
      tip: '接口生成方式：SwaggerUri、SwaggerJson、自定义',
      valueType: 'select',
      width: 100,
      valueEnum: {
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
      },
    },
    {
      title: 'swaggerJson',
      dataIndex: 'swaggerJson',
      tip: '服务OpenApi规范json数据',
      hideInSearch: true,
      width: 150,
    },

    {
      title: 'SwaggerUri',
      dataIndex: 'swaggerUri',
      tip: 'swaggerUri 接口地址',
      width: 150,
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 230,
      render: (text, record, _, action) => [
        <a
          key="readtable"
          onClick={() => {
            console.log('---->>ssss>');
            console.log(record, action);
            console.log('---->>ssss>');
            setDrawerGatewayForm(true);
            setDrawerGatewayType('read');
            setDrawerGatewayReadData(record);
          }}
        >
          查看
        </a>,
        <a
          key="editable"
          onClick={() => {
            console.log('---->>ssss>');
            console.log(record, action);
            console.log('---->>ssss>');
            setDrawerGatewayForm(true);
            setDrawerGatewayType('update');
            setDrawerGatewayReadData(record);
          }}
        >
          编辑
        </a>,
        <a
          key="deltable"
          onClick={() => {
            renderRemoveRoute(record.id, record.routeName);
          }}
        >
          删除
        </a>,
        (record.openApiType != '2') &&
        <a
          key="editable"
          onClick={() => {
            if(record.openApiType != '2'){
              rendeCreateRoute(record);
            }else{
              Modal.info({
                title: '提示',
                content: '此服务为自定义模式，请选择接口注册模块加载接口。',
              });
            }
          }}
        >
          接口同步
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        scroll={{ x: 1300 }}
        columns={columns}
        actionRef={actionRef}
        // request={selectRoute}
        request={async (params = {}, sort, filter) => {
          console.log('=====222=');
          params.uid = currentUser.uid;
          console.log(params);
          return selectRoute({ ...params, type });
          // return {
          //   data: routeData.data,
          //   // success 请返回 true，
          //   // 不然 table 会停止解析数据，即使有数据
          //   success: true,
          //   // 不传会使用 data 的长度，如果是分页一定要传
          //   total: routeData.totalcount,
          // };
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, '---');
            console.log(data);
            //console.log(row);
            console.log(rowKey, '--3-');
          },
          onChange: setEditableRowKeys,
        }}
        // columnsState={{
        //   persistenceKey: 'pro-table-singe-demos',
        //   persistenceType: 'localStorage',
        // }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        // eslint-disable-next-line react/jsx-no-duplicate-props
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setDrawerGatewayForm(true);
              setDrawerGatewayType('add');
              setDrawerGatewayReadData({ uid: currentUser.uid, protocol: 'http', timeout: 30 });
              console.log('------>>>>', drawerGatewayForm);
            }}
          >
            新建
          </Button>,
        ]}
      />
      <GatewayForm
        drawerGatewayForm={drawerGatewayForm}
        // onCancel={() => {
        //   setDrawerGatewayForm(false);
        // }}
        onVisibleChange={(value) => {
          setDrawerGatewayForm(value);
          setDrawerGatewayReadData({});
        }}
        drawerGatewayReadData={drawerGatewayReadData}
        drawerGatewayType={drawerGatewayType}
        onDone={drawerGatewayDone}
        onSubmit={drawerGatewaySubmit}
      />
    </PageContainer>
  );
};
