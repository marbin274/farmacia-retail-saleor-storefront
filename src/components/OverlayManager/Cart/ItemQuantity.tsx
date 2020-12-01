import * as React from "react";
import addImg from "../../../images/add.svg";
import ReactSVG from "react-svg";
import minusImg from "../../../images/minus.svg";
import classNames from "classnames";

type IProps = {
  enableRemoveLastItem?: boolean,
  onAdd: () => void;
  onRemove: () => void;
  value: string;
  className?: string;
};

const ItemQuantity: React.FC<IProps> = ({
  className = null,
  enableRemoveLastItem= true,
  onAdd,
  onRemove,
  value,
}) => {
    const isLastItem = (): boolean => parseInt(value, 10) <= 1;
    const isRemoveDisabled = () => !enableRemoveLastItem && isLastItem();

    const handleRemoveClick = () => {
      if (!isRemoveDisabled()) {
        onRemove();
      }
    }

    return (
    <div className={classNames("cart__list__item__quantity", className)}>
      <ReactSVG
        path={minusImg}
        className={classNames("cart__list__item__quantity__icon", {"disabled": isRemoveDisabled()})}
        onClick={ handleRemoveClick }
      />
      <p className="cart__list__item__quantity__text">{value}</p>
      <ReactSVG
        path={addImg}
        className="cart__list__item__quantity__icon"
        onClick={onAdd}
      />
    </div>
  );
}

export default ItemQuantity;
