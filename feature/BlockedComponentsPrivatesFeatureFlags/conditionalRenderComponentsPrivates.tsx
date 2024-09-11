import React from "react";
import { featureFlags } from "./feactureFlagsComponentsPrivates";

interface ConditionalRendererProps {
  children: React.ReactNode;
  viewName: string;
}

const ConditionalRendererComponentePrivate: React.FC<
  ConditionalRendererProps
> = ({ children, viewName }) => {
  const renderChildren = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child)) {
      const componentName =
        typeof child.type === "string"
          ? child.type
          : (child.type as React.ComponentType).displayName ||
            (child.type as React.ComponentType).name ||
            "";

      const featureConfig = featureFlags[viewName];

      if (
        featureConfig?.enabled &&
        featureConfig.components.includes(componentName)
      ) {
        return null;
      }

      if (child.props && child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: React.Children.map(child.props.children, renderChildren),
        });
      }
    }
    return child;
  };

  return <>{React.Children.map(children, renderChildren)}</>;
};

export default ConditionalRendererComponentePrivate;
