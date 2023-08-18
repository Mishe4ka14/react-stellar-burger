import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredient } from "../../services/actions/constructor";
import { useDispatch } from "react-redux";
import styles from './constructor-item.module.css'
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/constanst";

export const ConstructorItem = ({ ingredient, swap, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CONSTRUCTOR,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CONSTRUCTOR,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      swap(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li className={styles.container} ref={ref} style={{ opacity, cursor: 'pointer' }}>
      <DragIcon type="primary"/>
      <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={() => dispatch(removeIngredient(ingredient))}/>
    </li>
  );
};
