import { PropsWithChildren, ReactNode } from "react";
import { CardTitle, StyledCard, CardHeader, CardContent, CollapsibleContent, CollapsibleContainer } from "./Card.style";

interface CardProps {
  title: string | ReactNode;
  action?: string | ReactNode;
  fullWidth?: boolean;
  collapsibleItems?: ReactNode;
  open?: boolean;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({children, title, action, fullWidth, collapsibleItems, open}) => {
  return (
    <StyledCard className="card-container" gap=".5rem">
      <CardHeader >
        <CardTitle variant="h2">{title}</CardTitle>
        {action}
      </CardHeader>
       {
        collapsibleItems && (
          <CollapsibleContent in={open} timeout="auto">
            {open && (
              <CollapsibleContainer data-testid="card-block-collapsible">
                {collapsibleItems}
              </CollapsibleContainer>
            )}
          </CollapsibleContent>
        )
      }
      <CardContent fullWidth={fullWidth}>
        {children}
      </CardContent>
    </StyledCard>
  )
};

export default Card;