export function getUrlSearchParams() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
}

export function setUrlSearchParam(name, _value= '') {
    const value = _value === null ? '' : _value;
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(name, value);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}
