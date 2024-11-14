import { UseMainContext } from "@/context/MainContext";

const Overlay = () => {
    const { toggleShowNav } = UseMainContext();

    const _onOverlayClick = (e) => {
        toggleShowNav?.();
    };

    return <div className="overlay" onClick={_onOverlayClick} />;
};

export default Overlay;
