import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredient } from "../../services/actions/constructor";
import { useDispatch } from "react-redux";
import styles from './constructor-item.module.css'
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "../../utils/constanst";
import { TConstructorItem } from "../../services/types/types";
import { TDragItem } from "../../services/types/types";

export const ConstructorItem = ({ ingredient, swap, index }:TConstructorItem):JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONSTRUCTOR,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CONSTRUCTOR,
    hover(item: TDragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      swap(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div className={styles.container} ref={ref} style={{ opacity, cursor: 'pointer' }}>
      <DragIcon type="primary"/>
      <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => dispatch(removeIngredient(ingredient))}/>
    </div>
  );
};
