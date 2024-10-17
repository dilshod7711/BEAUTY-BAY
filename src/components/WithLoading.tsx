import { useState, useEffect } from "react";
import {  Spin } from 'antd';

const WithLoading = (WrappedComponent: any) => {
  return function WithLoadingComponent() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); 

      return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
              <Spin size="large"  className="text-center"/>
        </div>
      );
    }

    return <WrappedComponent />;
  };
};

export default WithLoading;
