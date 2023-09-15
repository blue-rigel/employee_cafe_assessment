import { Layout, Menu, message } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;

export default function DefaultLayout() {
    const [_messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const route = useNavigate();

    return (
        <Layout className="layout">
            {contextHolder}
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="demo-logo"></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname.split("/")[1]]}
                    items={[
                        {
                            key: "",
                            label: "Cafés",
                            onClick: () => route("/"),
                        },
                        {
                            key: "employees",
                            label: "Employees",
                            onClick: () => route("/employees"),
                        },
                    ]}
                />
            </Header>
            <Content
                style={{
                    padding: "20px 50px",
                }}
            >
                <div
                    className="site-layout-content"
                    style={{
                        background: "white",
                    }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
}
