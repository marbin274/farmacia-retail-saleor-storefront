import AccountLayout from '@app/pages/AccountPage/AccountLayout';
import { AddressFormModal, AddressGrid, Modal } from '@components/organisms';
import { CheckIcon, TrashIcon } from '@farmacia-retail/farmauna-components';
import { AddressTypeEnum, CountryCode } from '@sdk/gqlTypes/globalTypes';
import {
  useCreateUserAddress,
  useDefaultUserAddress,
  useDeleteUserAddresss,
  useUpdateUserAddress,
  useUserDetails,
} from '@sdk/react';
import { alertService } from '@temp/@next/services';
import { Alert } from '@temp/@next/components/molecules';
import { IAddressForm } from '@temp/@next/components/organisms/AddressFormModal/types';
import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';
import React, { useEffect, useState } from 'react';

export const AddressBook: React.FC = () => {
  const { data: user } = useUserDetails();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEditSuccess, setShowAddEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [addressToUpdate, setAddressToUpdate] =
    useState<UserDetails_me_addresses>(null);
  const [addressToDelete, setAddressToDelete] =
    useState<UserDetails_me_addresses>(null);

  const [
    setCreatUserAddress,
    { data: createData, error: createError, loading: createLoading },
  ] = useCreateUserAddress();

  useEffect(() => {
    if (createData && !createError) {
      setShowFormModal(false);
      setShowAddEditSuccess(true);
    }

    if (!createData?.user && (createData?.errors.length > 0 || createError)) {
      showGenericError();
    }
  }, [createData, createError]);

  const [
    setUpdateUserAddress,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useUpdateUserAddress();

  useEffect(() => {
    if (updateData && !updateError) {
      setShowFormModal(false);
      setShowAddEditSuccess(true);
    }

    if (!updateData?.user && (updateData?.errors.length > 0 || updateError)) {
      showGenericError();
    }
  }, [updateData, updateError]);

  const [
    setDeleteUserAddress,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useDeleteUserAddresss();

  useEffect(() => {
    if (deleteData?.user && !deleteData?.errors.length && !deleteError) {
      setShowDeleteSuccess(true);
    }

    if (!deleteData?.user && (deleteData?.errors.length > 0 || deleteError)) {
      showGenericError();
    }
  }, [deleteData, deleteError]);

  const [
    setDefaultUserAddress,
    {
      data: setDefaultData,
      error: setDefaultError,
      loading: setDefaultLoading,
    },
  ] = useDefaultUserAddress();

  useEffect(() => {
    if (
      !setDefaultData?.user &&
      (setDefaultData?.errors.length > 0 || setDefaultError)
    ) {
      showGenericError();
    }
  }, [setDefaultData, setDefaultError]);

  const clearAlers = () => {
    setShowAddEditSuccess(false);
    setShowDeleteSuccess(false);
  };

  const showGenericError = () => {
    alertService.sendAlert({
      buttonText: 'Entendido',
      message: 'Ha ocurrido un error al procesar la solicitud',
      type: 'Text',
    });
  };

  const handleSubmit = (values: IAddressForm) => {
    clearAlers();

    if (addressToUpdate?.id) {
      setUpdateUserAddress({
        id: addressToUpdate?.id,
        input: {
          alias: values.alias,
          city: values.city.name,
          country: CountryCode.PE,
          latitude: Number(values.latitude),
          longitude: Number(values.longitude),
          streetAddress1: values.streetAddress1,
          streetAddress2: values.streetAddress2,
          isDefault: addressToUpdate.isDefaultShippingAddress,
        },
      });
      return;
    }

    setCreatUserAddress({
      input: {
        alias: values.alias,
        city: values.city.name,
        country: CountryCode.PE,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        streetAddress1: values.streetAddress1,
        streetAddress2: values.streetAddress2,
      },
    });
  };

  const handleDelete = () => {
    if (deleteLoading || !addressToDelete) {
      return;
    }

    setDeleteUserAddress({
      addressId: addressToDelete.id,
    });
    clearAlers();
    setShowDeleteModal(false);
  };

  const handleSetDefault = (id: string) => {
    if (setDefaultLoading) {
      return;
    }

    clearAlers();

    setDefaultUserAddress({
      id,
      type: AddressTypeEnum.SHIPPING,
    });

    setDefaultUserAddress({
      id,
      type: AddressTypeEnum.BILLING,
    });
  };

  const getAddressToDeleteAlias = () => {
    if (!addressToDelete) {
      return '';
    }

    if (addressToDelete.alias) {
      return `"${addressToDelete.alias}"`;
    }

    if (addressToDelete.firstName) {
      return `"${addressToDelete.firstName} ${addressToDelete.lastName}"`;
    }

    return 'la dirección';
  };

  return (
    <AccountLayout>
      <div className="fa-w-full">
        {showAddEditSuccess && (
          <Alert
            icon={<CheckIcon size={12} />}
            message="Dirección guardada con éxito"
            className="fa-mb-4 fa-hidden md:fa-flex"
          />
        )}
        {showDeleteSuccess && (
          <Alert
            icon={<TrashIcon size={12} />}
            message="La dirección ha sido eliminada"
            className="fa-mb-4 fa-hidden md:fa-flex"
            type="error"
          />
        )}
        <AddressGrid
          addresses={user?.addresses}
          onClickAdd={() => {
            setAddressToUpdate(undefined);
            setShowFormModal(true);
          }}
          onClickDelete={(address) => {
            setAddressToDelete(address);
            setShowDeleteModal(true);
          }}
          onClickEdit={(address) => {
            setAddressToUpdate(address);
            setShowFormModal(true);
          }}
          onClickSetDefault={handleSetDefault}
          showAddEditSuccess={showAddEditSuccess}
          showDeleteSuccess={showDeleteSuccess}
        />
        {showFormModal && (
          <AddressFormModal
            hideModal={() => {
              setShowFormModal(false);
            }}
            title="Agregar nueva dirección"
            show={showFormModal}
            address={addressToUpdate}
            onSubmit={handleSubmit}
            loading={createLoading || updateLoading}
          />
        )}
        {showDeleteModal && (
          <Modal
            show={showDeleteModal}
            submitBtnText="Sí, borrar"
            hide={() => {
              setShowDeleteModal(false);
              setAddressToDelete(undefined);
            }}
            onSubmit={() => handleDelete()}
            disabled={false}
          >
            <div className="fa-flex fa-flex-col fa-items-center">
              <img
                src="/assets/auna/delete-pin.svg"
                width={80}
                height={80}
                className="fa-mt-4 fa-mb-4"
              />
              <p className="fa-text-center fa-font-semibold fa-mb-8">
                {`¿Seguro que quieres borrar ${getAddressToDeleteAlias()} de Farmauna?`}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </AccountLayout>
  );
};

export default AddressBook;
