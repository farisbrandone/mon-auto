/* 

 <div className="text-black text-[16px] min-h-screen flex flex-col ">
        <HeaderCars />
        <Link
          href="/cars"
          className="flex items-center mt-2 cursor-pointer pl-2 w-[250px] "
        >
          <div className="p-1.5 bg-[#1eb0fc] flex items-center rounded-sm ">
            <Previous />
            <Previous className="-ml-1" />
          </div>
          <p className="ml-2 w-full flex-1 font-[800] ">
            Retour à l'inventaire
          </p>
        </Link>
        <div className="flex flex-grow flex-col gap-1 sm:grid sm:grid-cols-2 mt-2 mb-2 p-2">
        
          <div className="mt-2">
            <SkeletonTrue className="h-[450px] w-full " />
            
          </div>

          <div className="w-full mt-4 border-[1px] border-solid border-[#33333359] shadow-2xl rounded-md max-w-7xl mx-auto ">
            <p className="w-full text-center text-[18px] font-[600] text-[#333333] mb-4 mt-2 ">
              {" "}
              Contactez nous
            </p>
            <form
              className="flex flex-col gap-2 w-full p-3 rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" flex flex-col sm:grid sm:grid-cols-2 w-full gap-2">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Nom</Label>
                    <Input
                      type="text"
                      className="border-[1px] border-solid border-[#33333327] rounded-sm "
                      {...register("nom")}
                    />
                    {errors.nom && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      className="border-[1px] border-solid border-[#33333327] rounded-sm "
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <Label>Prenom</Label>
                    <Input
                      type="text"
                      className="border-[1px] border-solid border-[#33333327] rounded-sm "
                      {...register("prenom")}
                    />
                    {errors.prenom && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.prenom.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label>Telephone</Label>
                    <Input
                      type="text"
                      className="border-[1px] border-solid border-[#33333327] rounded-sm "
                      {...register("telephone")}
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.telephone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Message</Label>
                <Textarea
                  rows={6}
                  className="border-[1px] border-solid border-[#33333327] rounded-sm w-full "
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-[120px] text-[18px] p-2 bg-[#333333] text-white border-none   cursor-pointer hover:bg-[#3333338a] transition-colors duration-300  rounded-md disabled:cursor-not-allowed "
                onClick={handleSubmit(onSubmit)}
                disabled={true}
              >
                {isSubmitting ? "en cours..." : "Soumettre"}
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>

*/
