"use client";

import LoadingPage from "@/components/layout/LoadingPage";
import AccountForm from "@/components/template/profile/AccountForm";
import BankForm from "@/components/template/profile/BankForm";
import PersonalForm from "@/components/template/profile/PersonalForm";
import { getUser, updateProfile } from "@/core/services/configs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LOADING_TOAST = "update-prof-toast-loading";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    id: "",
    mobile: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationalCode: "",
    payment: {
      shaba_code: "",
      debitCard_code: "",
      accountIdentifier: "",
    },
  });

  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenPersonal, setIsOpenPersonal] = useState(false);
  const [isOpenBank, setIsOpenBank] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getUser(),
  });

  const { mutate } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data) => updateProfile(data),
    onMutate: () => {
      toast.loading("لطفا صبر کنید ...", {
        id: LOADING_TOAST,
        duration: Infinity,
      });
    },
    onSuccess: async () => {
      toast.dismiss(LOADING_TOAST);
      setIsOpenAccount(false);
      setIsOpenPersonal(false);
      setIsOpenBank(false);
      toast.success("ویرایش با موفقیت انجام شد.");
      await queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
    },
    onError: (err) => {
      toast.dismiss(LOADING_TOAST);
      toast.error("در ویرایش اطلاعات به مشکل خوردید!");
    },
  });

  useEffect(() => {
    if (data) {
      const user = data?.user;
      setProfileData((prev) => ({ ...prev, ...user }));
    }
  }, [data]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col w-full gap-5 pr-5 mt-6">
      <AccountForm
        profileData={profileData}
        isOpen={isOpenAccount}
        setIsOpen={setIsOpenAccount}
        mutate={mutate}
      />
      <PersonalForm
        profileData={profileData}
        isOpen={isOpenPersonal}
        setIsOpen={setIsOpenPersonal}
        mutate={mutate}
      />
      <BankForm
        profileData={profileData}
        isOpen={isOpenBank}
        setIsOpen={setIsOpenBank}
        mutate={mutate}
      />
    </div>
  );
}
