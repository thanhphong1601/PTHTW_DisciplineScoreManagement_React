import { Outlet } from "react-router-dom";

const MissingReport = () => {
    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Trang Trợ Lý</h1>
        </div>
        <Outlet></Outlet>
    </>
}

export default MissingReport;