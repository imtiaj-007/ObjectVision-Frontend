import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { Address } from '@/types/general';
import {
    fetchAddresses,
    fetchUserAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} from '@/store/features/address/addressThunk';
import { clearAddressError, resetAddressState } from '@/store/features/address/addressSlice';


export const useAddress = () => {
    const dispatch = useDispatch<AppDispatch>();
    const addressStates = useSelector(
        (state: RootState) => state.address
    );

    const getAllAddresses = useCallback(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    const getUserAddresses = useCallback((userId: number | string) => {
        dispatch(fetchUserAddresses(userId));
    }, [dispatch]);

    const addAddress = useCallback((address: Address) => {
        dispatch(createAddress(address));
    }, [dispatch]);

    const editAddress = useCallback((addressId: number | string, address: Address) => {
        dispatch(updateAddress({ addressId, payload: address }));
    }, [dispatch]);

    const removeAddress = useCallback((addressId: number | string) => {
        dispatch(deleteAddress(addressId));
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearAddressError());
    }, [dispatch]);

    const resetState = useCallback(() => {
        dispatch(resetAddressState());
    }, [dispatch]);

    return useMemo(()=> ({
        // States
        ...addressStates,
        
        // Methods
        getAllAddresses,
        getUserAddresses,
        addAddress,
        editAddress,
        removeAddress,
        clearError,
        resetState,
    }), [addAddress, addressStates, clearError, editAddress, getAllAddresses, getUserAddresses, removeAddress, resetState]);
};
