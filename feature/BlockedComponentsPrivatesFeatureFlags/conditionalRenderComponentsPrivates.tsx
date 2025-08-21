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
    if (!React.isValidElement(child)) return child;
    
    const typedChild = child as React.ReactElement<{ children?: React.ReactNode }>;
    const componentName =
      typeof typedChild.type === "string"
        ? typedChild.type
        : (typedChild.type as React.ComponentType).displayName ||
          (typedChild.type as React.ComponentType).name ||
          "";

    const featureConfig = featureFlags[viewName];

    if (
      featureConfig?.enabled &&
      featureConfig.components.includes(componentName)
    ) {
      return null;
    }

    if (typedChild.props && typedChild.props.children) {
      return React.cloneElement(typedChild, {
        ...typedChild.props,
        children: React.Children.map(typedChild.props.children, renderChildren),
      });
    }
    
    return typedChild;
  };

  return <>{React.Children.map(children, renderChildren)}</>;
};

export default ConditionalRendererComponentePrivate;
