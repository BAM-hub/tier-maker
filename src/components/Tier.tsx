import { ParentComponent, ParentProps } from "solid-js";
import style from "../style/Tier.module.css";

interface TierProps extends ParentProps {
  title: string;
}

const Tier: ParentComponent<TierProps> = (props: TierProps) => {
  return (
    <div class={style.tierContainer}>
      <div class={style.tierTitle}>
        <h1>{props?.title}</h1>
      </div>
      <div class={style.tierContentContainer}>{props.children}</div>
    </div>
  );
};

export default Tier;
