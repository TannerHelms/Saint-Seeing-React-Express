const MenuTile = ({ icon, text, onClick }) => {
  return (
    <div
      className="flex row w-100 g-20 cursor-pointer hover-secondary p-2 br"
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default MenuTile;
