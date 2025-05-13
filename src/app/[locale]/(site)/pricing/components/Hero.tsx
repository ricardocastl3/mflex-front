import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroPlans() {
  return (
    <div
      style={{
        objectFit: "fill",
        backgroundRepeat: "no-repeat",
        backgroundPosition: window.innerWidth <= 765 ? "center" : "",
        backgroundImage: `url(https://img.freepik.com/free-vector/speed-motion-lines-curvy-style_1017-37409.jpg?t=st=1747163123~exp=1747166723~hmac=ebbd1cb9b53526bf2c66b0f6c60ca04113a6d3507676a6842d7ce9582879132b&w=1380)`,
        backgroundSize: "cover",
      }}
      className="md:h-[55vh] h-[40vh] flex-col relative flex md:items-start items-center md:text-start text-center justify-center md:px-14 px-4"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="flex flex-col gap-2 z-20">
        <h1 className="md:text-[2rem] text-[1.7rem] font-bold text-white">
          <CTranslateTo eng="Flex Plans" pt="Planos Flex" />
        </h1>
        <h4 className="text-white md:mt-2 t-2 text-lg">
          <CTranslateTo
            eng="Get unlimited access to our platform's features 🚀"
            pt="Obtenha acesso ilimitado aos recursos da nossa plataforma 🚀"
          />
        </h4>
      </div>
    </div>
  );
}
