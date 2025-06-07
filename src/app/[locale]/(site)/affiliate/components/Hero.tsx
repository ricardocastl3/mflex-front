import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroServices() {
  return (
    <div
      style={{
        objectFit: "fill",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(https://img.freepik.com/free-photo/smiling-asian-woman-pointing-fingers-left-showing-advertisement-empty-copy-space-standing-yellow-background_1258-92225.jpg?t=st=1744019799~exp=1744023399~hmac=159cead594fdb9f5c02ddd613111f8ed32ccc67fee30c691a2c23404e54c3e15&w=1380)`,
        backgroundSize: "cover",
      }}
      className="md:h-[55vh] h-[40vh] flex-col relative flex md:items-start items-center md:text-start text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col gap-2 z-20">
        <h1 className="md:text-[2rem] text-[1.7rem] font-bold text-white">
          <CTranslateTo eng="FLEX Affiliate" pt="Afiliado FLEX" />
        </h1>
        <h4 className="text-white md:mt-2 t-2 text-lg">
          <CTranslateTo
            eng="Earn money every day by being our affiliate 💸"
            pt="Ganhe dinheiro todos os dias sendo nosso afiliado 💸"
          />
        </h4>
      </div>
    </div>
  );
}
